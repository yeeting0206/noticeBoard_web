import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnnouncementList from "../pages/AnnouncementList";
import AddEdit from "../pages/addEdit";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnnouncementList />} />
        <Route path="/edit" element={<AddEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
