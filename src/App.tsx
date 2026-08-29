import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/layout";
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
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverviewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
