import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSearchParams } from "react-router-dom";

function AddEdit() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    subject: "",
    publishDate: "",
    endDate: "",
    content: "",
  });

  useEffect(() => {
    if (id) {
      // TODO: 呼叫 API 取得資料
      // 暫時模擬資料
      setForm({
        subject: "網站維護公告",
        publishDate: "2025-04-10",
        endDate: "2025-04-20",
        content: "<p>網站將於 4/20 維護</p>"
      });
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
      console.log("更新公告：", form);
    } else {
      console.log("新增公告：", form);
    }
    // TODO: 串接後端 API
  };

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
          <label className="col-sm-2 col-form-label">公告內容:</label>
          <div className="col-sm-10">
            <Editor
              value={form.content}
              onEditorChange={handleEditorChange}
              init={{
                height: 300,
                menubar: false,
                plugins: "lists link table paste",
                toolbar: "undo redo | bold italic | bullist numlist | link table"
              }}
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
