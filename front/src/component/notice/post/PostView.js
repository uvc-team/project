import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../../css/Post.css";
import jwt_decode from "jwt-decode";

const PostView = () => {
  const token = localStorage.getItem("token");
  let userId;

  if (token) {
    const decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

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
            headers: { Authorization: token },
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
  //댓글달기
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/answer/answer?noticeId=${noticeId}`,
        { comment: comment },
        {
          headers: { Authorization: token },
        }
      );
      setComment("");
      window.location.reload(navigate(`/postView/${noticeId}`));
    } catch (error) {
      console.error("error", error);
    }
  };
  //댓글삭제
  const handleDeleteComment = async (answerId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/answer/deleteAnswer`,
        {
          data: { answerId: answerId },
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        // answer 상태 업데이트
        setAnswer(
          answer.map((item) =>
            item.answerId === answerId
              ? { ...item, content: "사용자에 의해 삭제된 댓글입니다." }
              : item
          )
        );
      }
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

  if (!data) return <div>권한없습니다.</div>;

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
            {userId === answer.User.userId && (
              <button onClick={() => handleDeleteComment(answer.answerId)}>
                Delete
              </button>
            )}
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
