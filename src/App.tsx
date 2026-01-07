import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

// Public pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import AccessibilityPage from "./pages/Accessibility";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Student pages - redesigned for dyslexia
import StudentDashboard from "./pages/student/Dashboard";
import StudentAssessment from "./pages/student/Assessment";
import StudentSubjects from "./pages/student/Subjects";
import StudentUnits from "./pages/student/Units";
import StudentTopics from "./pages/student/Topics";
import StudentTopicExplanation from "./pages/student/TopicExplanation";
import StudentBookmarks from "./pages/student/Bookmarks";
import StudentProgress from "./pages/student/Progress";
import StudentSettings from "./pages/student/Settings";

// Teacher pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherLessons from "./pages/teacher/Lessons";
import TeacherReports from "./pages/teacher/Reports";

// Parent pages
import ParentDashboard from "./pages/parent/Dashboard";
import ParentProgress from "./pages/parent/Progress";
import ParentFeedback from "./pages/parent/Feedback";
import SubmissionUpload from "./pages/parent/SubmissionUpload";
import SubmissionConfirmation from "./pages/parent/SubmissionConfirmation";

// Components
import { ReadingRuler } from "./components/accessibility/ReadingRuler";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AccessibilityProvider>
          <Toaster />
          <Sonner />
          <ReadingRuler />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/contact" element={<Contact />} />

              {/* Student Routes - Dyslexia-optimized flow */}
              <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
              <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
              <Route path="/student/assessment" element={<ProtectedRoute role="student"><StudentAssessment /></ProtectedRoute>} />
              <Route path="/student/subjects" element={<ProtectedRoute role="student"><StudentSubjects /></ProtectedRoute>} />
              <Route path="/student/subjects/:subjectId/units" element={<ProtectedRoute role="student"><StudentUnits /></ProtectedRoute>} />
              <Route path="/student/subjects/:subjectId/units/:unitId/topics" element={<ProtectedRoute role="student"><StudentTopics /></ProtectedRoute>} />
              <Route path="/student/topics/:topicId" element={<ProtectedRoute role="student"><StudentTopicExplanation /></ProtectedRoute>} />
              <Route path="/student/bookmarks" element={<ProtectedRoute role="student"><StudentBookmarks /></ProtectedRoute>} />
              <Route path="/student/progress" element={<ProtectedRoute role="student"><StudentProgress /></ProtectedRoute>} />
              <Route path="/student/settings" element={<ProtectedRoute role="student"><StudentSettings /></ProtectedRoute>} />

              {/* Teacher Routes */}
              <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
              <Route path="/teacher/lessons" element={<ProtectedRoute role="teacher"><TeacherLessons /></ProtectedRoute>} />
              <Route path="/teacher/reports" element={<ProtectedRoute role="teacher"><TeacherReports /></ProtectedRoute>} />

              {/* Parent Routes */}
              <Route path="/parent" element={<ProtectedRoute role="parent"><ParentDashboard /></ProtectedRoute>} />
              <Route path="/parent/progress" element={<ProtectedRoute role="parent"><ParentProgress /></ProtectedRoute>} />
              <Route path="/parent/feedback" element={<ProtectedRoute role="parent"><ParentFeedback /></ProtectedRoute>} />
              <Route path="/parent/submission-upload" element={<ProtectedRoute role="parent"><SubmissionUpload /></ProtectedRoute>} />
              <Route path="/parent/submission-confirmation" element={<ProtectedRoute role="parent"><SubmissionConfirmation /></ProtectedRoute>} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AccessibilityProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
