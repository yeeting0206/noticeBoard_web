import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addAnnouncement, updateAnnouncement, getAnnouncement } from "../api/announcementApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

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


  const handleEditorChange = (content) => {
    setForm((prev) => ({ ...prev, content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

  }

  return (
    <div className="container my-5">
      <h3 className="mb-4">{id ? "編輯公告" : "新增公告"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="subject" className="col-sm-2 col-form-label">標題:</label>
          <div className="col-sm-6">
            <input type="text" id="subject" className="form-control" value={form.subject} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="publishDate" className="col-sm-2 col-form-label">發佈日期:</label>
          <div className="col-sm-4">
            <input type="date" id="publishDate" className="form-control" value={form.publishDate} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="endDate" className="col-sm-2 col-form-label">截止日期:</label>
          <div className="col-sm-4">
            <input type="date" id="endDate" className="form-control" value={form.endDate} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="content" className="col-sm-2 col-form-label">公告內容:</label>
          <div className="col-sm-10">
            <textarea
              id="content"
              className="form-control"
              rows="6"
              value={form.content}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-primary">送出</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEdit;
