import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/lib/i18n";
import RootLayout from "./pages/layout";
import DashboardPage from "./pages/dashboard/page";
import ExamInstitutionsPage from "./pages/exam/page";
import ExamSearchPage from "./pages/exam/search/page";
import ExamSubjectsPage from "./pages/exam/subjects/page";
import ExamOptionsPage from "./pages/exam/subjects/options";
import ExamBoardPage from "./pages/exam/subjects/take/page";
import ExamResultPage from "./pages/exam/subjects/result/page";
import HistoryPage from "./pages/history/page";
import InfoPage from "./pages/info/page";
import InstitutePage from "./pages/info/institute/page";
import ProfilePage from "./pages/profile/page";
import InfoComingSoonPage from "./pages/info/coming-soon/page";
import ErrorPage from "./pages/error/page";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "exam", children: [
        { index: true, element: <ExamInstitutionsPage /> },
        { path: "search", element: <ExamSearchPage /> },
        { path: ":institution", element: <ExamSubjectsPage /> },
        { path: ":institution/:subjectId", element: <ExamOptionsPage /> },
        { path: ":institution/:subjectId/take", element: <ExamBoardPage /> },
        { path: ":institution/:subjectId/result", element: <ExamResultPage /> },
      ]},
      { path: "history", element: <HistoryPage /> },
      { path: "info", element: <InfoComingSoonPage /> },
      { path: "info/:institution", element: <InstitutePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

const element = document.getElementById("root");
if (!element) throw new Error("Root element #root not found");

const app = (
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StrictMode>
);

(import.meta.hot.data.root ??= createRoot(element)).render(app);
