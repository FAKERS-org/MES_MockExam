import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import DashboardOverviewPage from "./pages/dashboard/overview-page";
import ExamInstitutionsPage from "./pages/exam/institutions-page";
import ExamSubjectsPage from "./pages/exam/subjects-page";
import ExamOptionsPage from "./pages/exam/options-page";
import HistoryPage from "./pages/history/page";
import InfoPage from "./pages/info/page";
import UniversityPage from "./pages/info/institute-page";
import ErrorPage from "./pages/error/page";
import ProfilePage from "./pages/profile/page";
import ExamLayout from "./layouts/exam-layout";
import ExamBoardPage from "./pages/exam/board-page";
import ExamResultPage from "./pages/exam/result-page";
import "./index.css";

export function App() {
  return (
    <Routes>
      {/* ── Exam routes — separate root-level path, uses ExamLayout ── */}
      <Route path="/exam/:institution/:subjectId/take" element={<ExamLayout />}>
        <Route index element={<ExamBoardPage />} />
        <Route path="result" element={<ExamResultPage />} />
      </Route>

      {/* ── All other routes go through the main app layout ── */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardOverviewPage />} />
        <Route path="exam" element={<ExamInstitutionsPage />} />
        <Route path="exam/:institution" element={<ExamSubjectsPage />} />
        <Route path="exam/:institution/:subjectId" element={<ExamOptionsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="info" element={<InfoPage />} />
        <Route path="info/:institution" element={<UniversityPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
