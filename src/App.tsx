import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/layout";
import DashboardOverviewPage from "./pages/dashboard/overview-page";
import SubjectsPage from "./pages/dashboard/subjects-page";
import ExamOptionsPage from "./pages/dashboard/exam-options-page";
import HistoryPage from "./pages/history/page";
import InfoPage from "./pages/info/page";
import ErrorPage from "./pages/error/page";
import "./index.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardOverviewPage />} />
        <Route path="dashboard/:institution" element={<SubjectsPage />} />
        <Route path="dashboard/:institution/:subjectId" element={<ExamOptionsPage />} />
        <Route path="dashboard/:institution/:subjectId/take" element={<div>Standard Exam placeholder</div>} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="info" element={<InfoPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
