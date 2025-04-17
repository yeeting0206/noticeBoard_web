import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { listAnnouncements, deleteAnnouncement } from "../api/announcementApi";

export default function AnnouncementList() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    listAnnouncements()
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("取得失敗", err));
  }, []);

  const handleDelete = (id) => {
    deleteAnnouncement(id)
      .then(() => {
        setAnnouncements(prev => prev.filter(item => item.id !== id));
      })
      .catch((err) => console.error("刪除失敗", err));
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">公告列表</h3>
      <button className="btn btn-success mb-3" onClick={() => navigate("/edit")}>
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
          {announcements.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-secondary">目前尚無公告資料</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
