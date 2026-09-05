import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/app-layout";
import DashboardOverviewPage from "@/pages/dashboard/overview-page";
import ExamInstitutionsPage from "@/pages/exam/institutions-page";
import ExamSubjectsPage from "@/pages/exam/subjects-page";
import ExamOptionsPage from "@/pages/exam/options-page";
import ExamBoardPage from "@/pages/exam/board-page";
import ExamResultPage from "@/pages/exam/result-page";
import ExamPage from "@/pages/exam/exam-page";
import HistoryPage from "@/pages/history/page";
import InfoPage from "@/pages/info/page";
import UniversityPage from "@/pages/info/institute-page";
import ProfilePage from "@/pages/profile/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardOverviewPage />,
      },
      {
        path: "/exam",
        element: <ExamInstitutionsPage />,
      },
      {
        path: "/exam/:institution",
        element: <ExamSubjectsPage />,
      },
      {
        path: "/exam/:institution/:subjectId",
        element: <ExamOptionsPage />,
      },
      {
        path: "/exam/:institution/:subjectId/take",
        element: <ExamBoardPage />,
      },
      {
        path: "/exam/:institution/:subjectId/result",
        element: <ExamResultPage />,
      },
      {
        path: "/exam/search",
        element: <ExamPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/info",
        element: <InfoPage />,
      },
      {
        path: "/info/:institution",
        element: <UniversityPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
