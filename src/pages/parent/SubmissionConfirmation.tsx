import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LexiCard } from "@/components/ui/lexi-card";
import { CheckCircle2, Calendar, User, FileText, Home } from "lucide-react";
import { format } from "date-fns";

export default function SubmissionConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const assignmentName = searchParams.get("assignmentName") || "Assignment";
  const studentName = searchParams.get("studentName") || "Student";
  const submittedAt = new Date();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-xl w-full space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Submission Successful!
          </h1>
          <p className="text-lg text-muted-foreground">
            The assignment evidence has been uploaded.
          </p>
        </div>

        {/* Submission Details */}
        <LexiCard className="p-6 text-left space-y-5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Assignment</p>
              <p className="text-lg font-semibold">{assignmentName}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Student</p>
              <p className="text-lg font-semibold">{studentName}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Submitted On</p>
              <p className="text-lg font-semibold">
                {format(submittedAt, "MMMM d, yyyy")}
              </p>
              <p className="text-muted-foreground">
                {format(submittedAt, "h:mm a")}
              </p>
            </div>
          </div>
        </LexiCard>

        {/* Action Button */}
        <Button
          onClick={() => navigate("/parent")}
          size="lg"
          className="w-full text-xl py-6 gap-3"
        >
          <Home className="h-5 w-5" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
