import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../../css/Post.css";

const PostView = () => {
  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [comment, setComment] = useState("");
  const { noticeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/notice/fullPosts?noticeId=${noticeId}`,
          {
            headers: { Authorization: localStorage.getItem("token") || "" },
          }
        );
        setData(response.data.notic);
        setAnswer(response.data.answer);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [noticeId]);

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/answer/answer?noticeId=${noticeId}`,
        { comment: comment },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setComment("");
      window.location.reload(navigate(`/postView/${noticeId}`));
    } catch (error) {
      console.error("error", error);
    }
  };

  // 시간 포맷팅 함수
  const formatTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="post-back-ground">
      <div className="top-section">
        <div className="info">
          <div>No: {data.noticeId}</div>
          <div>공지 날짜: {formatTime(data.createdAt)}</div>
          <div>조회 횟수: {data.readCount}</div>
        </div>
        <h1>{data.title}</h1>
      </div>
      <hr />
      <div className="content-section">
        <h3>공지사항:</h3>
        <p>{data.content}</p>
      </div>
      <hr />
      <div className="comment-section">
        {(answer || []).map((answer) => (
          <div className="comment" key={answer.answerId}>
            <strong>{answer.User.name}:</strong>
            <p>{answer.content}</p>
            <p>{formatTime(answer.createdAt)}</p>
          </div>
        ))}
        {/* Add a Comment */}
        <form onSubmit={handleCommentSubmit}>
          <label>댓글달기:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostView;
