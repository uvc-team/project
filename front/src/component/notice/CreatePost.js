import React, { useState } from "react";
import axios from "axios";
import "../../css/CreatePost.css";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_URL}/notice/notify`,
        {
          title: title,
          content: content,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log("게시글이 성공적으로 등록되었습니다.");
        window.location.reload(navigate("/"));
      })
      .catch((error) => console.error("Error:", error));

    setTitle("");
    setContent("");
  };

  return (
    <div className="post">
      <form onSubmit={handleFormSubmit}>
        <label className="post-label-1">
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </form>
      <form onSubmit={handleFormSubmit}>
        <label className="post-label-2">
          내용
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
      </form>
      <button type="submit">등록하기</button>
    </div>
  );
};

export default CreatePostPage;
