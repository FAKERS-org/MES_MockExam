import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard/page";
import ExamInstitutionsPage from "./pages/exam/page";
import ExamSubjectsPage from "./pages/exam/subjects/page";
import ExamOptionsPage from "./pages/exam/subjects/options";
import ExamBoardPage from "./pages/exam/subjects/take/page";
import ExamResultPage from "./pages/exam/subjects/result/page";
import ExamSearchPage from "./pages/exam/search/page";
import HistoryPage from "./pages/history/page";
import InfoPage from "./pages/info/page";
import InstitutePage from "./pages/info/institute/page";
import ProfilePage from "./pages/profile/page";
import ErrorPage from "./pages/error/page";
import "./index.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/exam" element={<ExamInstitutionsPage />} />
      <Route path="/exam/search" element={<ExamSearchPage />} />
      <Route path="/exam/:institution" element={<ExamSubjectsPage />} />
      <Route path="/exam/:institution/:subjectId" element={<ExamOptionsPage />} />
      <Route path="/exam/:institution/:subjectId/take" element={<ExamBoardPage />} />
      <Route path="/exam/:institution/:subjectId/result" element={<ExamResultPage />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/info/:institution" element={<InstitutePage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
