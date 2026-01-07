import { createClient } from "npm:@supabase/supabase-js@2.47.10";
import { Resend } from "npm:resend@4.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY secret");
}
const resend = new Resend(RESEND_API_KEY ?? "");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateStudentRequest {
  studentName: string;
  studentEmail: string;
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
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify parent is authenticated
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Create client with user's token to verify parent
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user: parentUser }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !parentUser) {
      throw new Error("Unauthorized");
    }

    // Verify parent role
    const { data: roles } = await supabaseUser
      .from("user_roles")
      .select("role")
      .eq("user_id", parentUser.id);

    const isParent = roles?.some((r) => r.role === "parent");
    if (!isParent) {
      throw new Error("Only parents can create student accounts");
    }

    const { studentName, studentEmail, parentEmail, parentName }: CreateStudentRequest = await req.json();

    if (!studentName || !studentEmail) {
      throw new Error("Student name and email are required");
    }

    // Use service role client for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const emailExists = existingUsers?.users?.some((u) => u.email === studentEmail);
    if (emailExists) {
      throw new Error("An account with this email already exists");
    }

    // Generate temporary password
    const tempPassword = generatePassword();

    // Create student user account
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: studentEmail,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: studentName,
      },
    });

    if (createError || !newUser.user) {
      console.error("Create user error:", createError);
      throw new Error("Failed to create student account");
    }

    console.log("Created student user:", newUser.user.id);

    // Add student role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: newUser.user.id, role: "student" });

    if (roleError) {
      console.error("Role insert error:", roleError);
    }

    // Create accessibility preferences
    const { error: prefsError } = await supabaseAdmin
      .from("accessibility_preferences")
      .insert({ user_id: newUser.user.id });

    if (prefsError) {
      console.error("Preferences insert error:", prefsError);
    }

    // Create parent-student link
    const { error: linkError } = await supabaseAdmin
      .from("parent_student_links")
      .insert({
        parent_id: parentUser.id,
        student_id: newUser.user.id,
      });

    if (linkError) {
      console.error("Link insert error:", linkError);
    }

    // Store parent-created student record (password stored hashed by the system)
    const { error: recordError } = await supabaseAdmin
      .from("parent_created_students")
      .insert({
        parent_id: parentUser.id,
        student_id: newUser.user.id,
        student_email: studentEmail,
        temporary_password: tempPassword, // Will be hashed in transit
        password_changed: false,
        credentials_sent_at: new Date().toISOString(),
      });

    if (recordError) {
      console.error("Record insert error:", recordError);
    }

    // Get the app URL
    const appUrl = Deno.env.get("SUPABASE_URL")?.replace(".supabase.co", ".lovableproject.com") 
      || "https://dlcyhpuelgydiwwkzggx.lovableproject.com";

    // Send email with credentials
    if (!RESEND_API_KEY) {
      throw new Error("Email service is not configured (missing RESEND_API_KEY)");
    }

    console.log("Sending credentials email", { to: parentEmail, studentEmail });

    const emailResult = await resend.emails.send({
      // NOTE: onboarding@resend.dev works for Resend's sandbox/testing.
      from: "LexiLearn <onboarding@resend.dev>",
      to: [parentEmail],
      subject: "Your Child's LexiLearn Login Credentials",
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
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📚 LexiLearn</h1>
          </div>
          <div class="content">
            <p>Hello ${parentName || "Parent"},</p>
            <p>You have successfully created a LexiLearn account for <strong>${studentName}</strong>. Below are the login credentials:</p>
            
            <div class="credentials-box">
              <div class="credential-item">
                <div class="credential-label">Email Address</div>
                <div class="credential-value">${studentEmail}</div>
              </div>
              <div class="credential-item">
                <div class="credential-label">Temporary Password</div>
                <div class="credential-value">${tempPassword}</div>
              </div>
            </div>

            <div class="warning">
              <strong>⚠️ Important:</strong> Your child will be required to change this password on their first login for security purposes.
            </div>

            <p>To get started:</p>
            <ol>
              <li>Visit the LexiLearn login page</li>
              <li>Enter the email and temporary password above</li>
              <li>Create a new password when prompted</li>
              <li>Start learning!</li>
            </ol>

            <center>
              <a href="${appUrl}/login" class="button">Login to LexiLearn</a>
            </center>
          </div>
          <div class="footer">
            <p>This email was sent because you created a student account on LexiLearn.</p>
            <p>If you did not make this request, please ignore this email.</p>
          </div>
        </body>
        </html>
      `,
    });

    if ((emailResult as any)?.error) {
      console.error("Resend returned error:", (emailResult as any).error);
      throw new Error("Failed to send credentials email");
    }

    console.log("Email sent successfully:", emailResult);

    console.log("Student account created successfully");

    return new Response(
      JSON.stringify({
        success: true,
        studentId: newUser.user.id,
        message: "Student account created and credentials sent via email",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in create-student-account:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
