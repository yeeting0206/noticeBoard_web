import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function AnnouncementList() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      subject: "網站維護公告",
      publishDate: "2025-04-10",
      endDate: "2025-04-15",
    },
  ]);

  const handleDelete = (id) => {
    const updated = announcements.filter((item) => item.id !== id);
    setAnnouncements(updated);
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">公告列表</h3>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/edit")}
      >
        新增公告
      </button>
      <table className="table table-bordered">
        <thead>
        <tr>
      <th className="text-center">標題</th>
      <th className="text-center">發佈日期</th>
      <th className="text-center">截止日期</th>
      <th colSpan="2" className="text-center">操作</th>
    </tr>
        </thead>
        <tbody>
          {announcements.map((item) => (
            <tr key={item.id}>
              <td>{item.subject}</td>
              <td>{item.publishDate}</td>
              <td>{item.endDate}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/edit?id=${item.id}`)}
                >
                  編輯
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
