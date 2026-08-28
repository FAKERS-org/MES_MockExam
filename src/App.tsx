import { Routes, Route } from "react-router-dom";
import DashboardOverviewPage from "./pages/dashboard/overview-page";
import "./index.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="container mx-auto p-8 text-center relative z-10">
          <h1 className="text-3xl font-bold">Welcome</h1>
        </div>
      } />
      <Route path="/dashboard" element={<DashboardOverviewPage />} />
    </Routes>
  );
}

export default App;
