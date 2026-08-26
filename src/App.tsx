import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/kontakt" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
