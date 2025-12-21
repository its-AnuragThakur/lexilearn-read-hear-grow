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

// Protected pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentLessons from "./pages/student/Lessons";
import StudentLesson from "./pages/student/Lesson";
import StudentPractice from "./pages/student/Practice";
import StudentProgress from "./pages/student/Progress";
import StudentSettings from "./pages/student/Settings";

import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherLessons from "./pages/teacher/Lessons";
import TeacherReports from "./pages/teacher/Reports";

import ParentDashboard from "./pages/parent/Dashboard";
import ParentProgress from "./pages/parent/Progress";
import ParentFeedback from "./pages/parent/Feedback";

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

              {/* Student Routes */}
              <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
              <Route path="/student/lessons" element={<ProtectedRoute role="student"><StudentLessons /></ProtectedRoute>} />
              <Route path="/student/lessons/:id" element={<ProtectedRoute role="student"><StudentLesson /></ProtectedRoute>} />
              <Route path="/student/practice" element={<ProtectedRoute role="student"><StudentPractice /></ProtectedRoute>} />
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
