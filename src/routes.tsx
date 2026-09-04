import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/app-layout";
import DashboardOverviewPage from "@/pages/dashboard/overview-page";
import SubjectsPage from "@/pages/dashboard/subjects-page";
import ExamOptionsPage from "@/pages/dashboard/exam-options-page";
import ExamBoardPage from "@/pages/exam/board/page";
import ExamResultPage from "@/pages/exam/result/page";
import HistoryPage from "@/pages/history/page";
import InfoPage from "@/pages/info/page";
import UniversityPage from "@/pages/info/instituteId/page";
import ProfilePage from "@/pages/profile/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // This is your main layout
    children: [
      {
        path: "/",
        element: <DashboardOverviewPage />, // Default dashboard
      },
      {
        path: "/dashboard/:institution",
        element: <SubjectsPage />, // Subjects for a specific institution
      },
      {
        path: "/dashboard/:institution/:subjectId",
        element: <ExamOptionsPage />, // Exam options for a subject
      },
      {
        path: "/exam/:institution/:subjectId/take",
        element: <ExamBoardPage />, // Exam board
      },
      {
        path: "/exam/:institution/:subjectId/result",
        element: <ExamResultPage />, // Exam result
      },
      {
        path: "/history",
        element: <HistoryPage />, // Exam history
      },
      {
        path: "/info",
        element: <InfoPage />, // Info page
      },
      {
        path: "/info/:institution",
        element: <UniversityPage />, // Specific institution info
      },
      {
        path: "/profile",
        element: <ProfilePage />, // User profile
      },
    ],
  },
]);
