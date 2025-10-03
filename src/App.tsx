import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./features/home/Home";
import LogSignPage from "./features/auth/Login";
import SignUpPage from "./features/auth/Signup";
import SettingsPage from "./features/settings/Settings";
import DashboardPage from "./features/dashboard/Dashboard";
import StatsPage from "./features/statistics/Statistics";
import TransactionsPage from "./features/transactions/Transactions";

export default function App() {
  return (
    <div className = "muje relative min-h-screen w-full overflow-hidden items-center justify-items-center">
      <div className="mesh-bg"></div>

      <BrowserRouter basename="/Coinwise">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/statistics" element={<StatsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/login" element={<LogSignPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}