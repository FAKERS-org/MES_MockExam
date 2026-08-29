import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/layout";
import DashboardOverviewPage from "./pages/dashboard/overview-page";
import SubjectsPage from "./pages/dashboard/subjects-page";
import ExamOptionsPage from "./pages/dashboard/exam-options-page";
import "./index.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="container mx-auto p-8 text-center relative z-10">
          <h1 className="text-3xl font-bold">Welcome</h1>
        </div>
      } />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverviewPage />} />
        <Route path=":institution" element={<SubjectsPage />} />
        <Route path=":institution/:subjectId" element={<ExamOptionsPage />} />
        <Route path=":institution/:subjectId/take" element={<div>Standard Exam placeholder</div>} />
      </Route>
    </Routes>
  );
}

export default App;
