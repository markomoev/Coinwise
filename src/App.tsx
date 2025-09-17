import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import LogSignPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import SettingsPage from "./pages/Settings";
import DashboardPage from "./pages/Dashborad";
import StatsPage from "./pages/Statistics";
import TransactionsPage from "./pages/Transactions";

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