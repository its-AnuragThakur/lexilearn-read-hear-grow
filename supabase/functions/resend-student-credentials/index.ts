import { createClient } from "npm:@supabase/supabase-js@2.47.10";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ResendCredentialsRequest {
  studentId: string;
  parentEmail: string;
  parentName: string;
}

function generatePassword(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user: parentUser }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !parentUser) {
      throw new Error("Unauthorized");
    }

    const { studentId, parentEmail, parentName }: ResendCredentialsRequest = await req.json();

    if (!studentId) {
      throw new Error("Student ID is required");
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Verify this parent created this student
    const { data: studentRecord, error: recordError } = await supabaseAdmin
      .from("parent_created_students")
      .select("*, profiles:student_id(full_name, email)")
      .eq("parent_id", parentUser.id)
      .eq("student_id", studentId)
      .single();

    if (recordError || !studentRecord) {
      throw new Error("Student not found or you don't have permission");
    }

    // Generate new password
    const newPassword = generatePassword();

    // Update user password
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      studentId,
      { password: newPassword }
    );

    if (updateError) {
      throw new Error("Failed to reset password");
    }

    // Update the record
    await supabaseAdmin
      .from("parent_created_students")
      .update({
        temporary_password: newPassword,
        password_changed: false,
        credentials_sent_at: new Date().toISOString(),
      })
      .eq("id", studentRecord.id);

    const studentProfile = studentRecord.profiles as any;
    const studentName = studentProfile?.full_name || "Student";
    const studentEmail = studentProfile?.email || studentRecord.student_email;

    const appUrl = Deno.env.get("SUPABASE_URL")?.replace(".supabase.co", ".lovableproject.com") 
      || "https://dlcyhpuelgydiwwkzggx.lovableproject.com";

    // Send email
    await resend.emails.send({
      from: "LexiLearn <onboarding@resend.dev>",
      to: [parentEmail],
      subject: "Your Child's New LexiLearn Login Credentials",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
            .credentials-box { background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .credential-item { margin: 15px 0; }
            .credential-label { color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .credential-value { font-size: 18px; font-weight: 600; color: #1e293b; font-family: monospace; background: #f1f5f9; padding: 8px 12px; border-radius: 6px; margin-top: 4px; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .button { display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📚 LexiLearn - Password Reset</h1>
          </div>
          <div class="content">
            <p>Hello ${parentName || "Parent"},</p>
            <p>The login credentials for <strong>${studentName}</strong> have been reset. Here are the new credentials:</p>
            
            <div class="credentials-box">
              <div class="credential-item">
                <div class="credential-label">Email Address</div>
                <div class="credential-value">${studentEmail}</div>
              </div>
              <div class="credential-item">
                <div class="credential-label">New Temporary Password</div>
                <div class="credential-value">${newPassword}</div>
              </div>
            </div>

            <div class="warning">
              <strong>⚠️ Important:</strong> Your child will be required to change this password on their first login.
            </div>

            <center>
              <a href="${appUrl}/login" class="button">Login to LexiLearn</a>
            </center>
          </div>
        </body>
        </html>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Credentials reset and sent via email" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in resend-student-credentials:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
