// routing
import { Route, Routes, BrowserRouter } from "react-router-dom";
//pages
import HomePage from "./features/home/Home";
import LogSignPage from "./features/auth/Login";
import SignUpPage from "./features/auth/Signup";
import SettingsPage from "./features/settings/Settings";
import DashboardPage from "./features/dashboard/Dashboard";
import TransactionsPage from "./features/transactions/Transactions";

// states for collapsed sidebar
import { useState } from "react";
import {SidebarContext} from "./context/SidebarContext"


export default function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className = "relative min-h-screen w-full overflow-hidden items-center justify-items-center">
      <SidebarContext.Provider value = {{collapsed, setCollapsed}}>
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/login" element={<LogSignPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </BrowserRouter>
      </SidebarContext.Provider>
    </div>
  );
}