import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../css/Post.css';
const PostView = () => {
  const [data, setData] = useState(null);
  const { noticeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/notice/fullPosts?noticeId=${noticeId}`,
          {
            headers: { Authorization: localStorage.getItem('token') || '' },
          }
        );
        console.log(response.data.notic)
        setData(response.data.notic); // Set the response data to your state variable
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [noticeId]);

  return (
    <div className="post-view-wrapper">
      <h2 align="center">게시글 상세정보</h2>
      {data ? (
        <>
          <div className="post-view-row">
            <label>게시글 번호</label>
            <label>{data.noticeId}</label>
          </div>
          <div className="post-view-row">
            <label>제목</label>
            <label>{data.title}</label>
          </div>
          <div className="post-view-row">
            <label>작성일</label>
            <label>{data.createDate}</label>
          </div>
          <div className="post-view-row">
            <label>조회수</label>
            <label>{data.readCount}</label>
          </div>
          <div className="post-view-row">
            <label>내용</label>
            <div>{data.content}</div>
          </div>
        </>
      ) : (
        '해당 게시글을 찾을 수 없습니다.'
      )}
      <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default PostView;
