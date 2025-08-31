import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import LogSignPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import SettingsPage from "./pages/Settings";

export default function App() {
  return (
    <div className = "relative min-h-screen w-full overflow-hidden items-center justify-items-center">
      <div className="mesh-bg"></div>

      <BrowserRouter basename="/Coinwise">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LogSignPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}