import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import SingerPage from "./pages/SingerPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={null} />
        <Route path="singer" element={null} />
        <Route path="singer/:singerId" element={<SingerPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}