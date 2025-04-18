import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  addAnnouncement,
  updateAnnouncement,
  getAnnouncement,
} from "../api/announcementApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; 
import 'react-quill/dist/quill.snow.css'

function AddEdit() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    publishDate: "",
    endDate: "",
    content: "",
  });

  useEffect(() => {
    if (id) {
      getAnnouncement(id)
        .then((res) => setForm(res.data))
        .catch((err) => console.error("取得公告失敗", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.subject || !form.publishDate || !form.endDate || !form.content) {
      alert("尚有欄位未填寫");
      return;
    }

    // 發佈日期需早於或等於截止日期
    if (form.publishDate > form.endDate) {
      alert("發佈日期不能晚於截止日期");
      return;
    }

    if (id) {
      // 編輯
      updateAnnouncement(id, form)
        .then(() => {
          alert("更新成功！");
          navigate("/"); // 導回列表頁
        })
        .catch((err) => {
          console.error("更新失敗", err);
          alert("更新失敗，請稍後再試！");
        });
    } else {
      // 新增
      addAnnouncement(form)
        .then(() => {
          alert("新增成功！");
          navigate("/"); // 導回列表頁
        })
        .catch((err) => {
          console.error("新增失敗", err);
          alert("新增失敗，請稍後再試！");
        });
    }
  };

  const handleContentChange = (value) => {
    setForm((prev) => ({ ...prev, content: value }));
  };
  

  return (
    <div className="container my-5">
      <h3 className="mb-4">{id ? "編輯公告" : "新增公告"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="subject" className="col-sm-2 col-form-label">
            標題:
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              id="subject"
              className="form-control"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="publishDate" className="col-sm-2 col-form-label">
            發佈日期:
          </label>
          <div className="col-sm-4">
            <input
              type="date"
              id="publishDate"
              className="form-control"
              value={form.publishDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="endDate" className="col-sm-2 col-form-label">
            截止日期:
          </label>
          <div className="col-sm-4">
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={form.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">公布者:</label>
          <div className="col-sm-4 pt-2">
            <span>Administrator</span>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="content" className="col-sm-2 col-form-label">
            公告內容:
          </label>
          <div className="w-full">
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={handleContentChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-primary">
              送出
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEdit;
