import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEdit from "./pages/addEdit";
import AnnouncementList from "./pages/AnnouncementList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnnouncementList />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/edit" element={<AddEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
