import React, { useState } from 'react';
import axios from 'axios';
import '../../css/CreatePost.css'
import { useNavigate } from 'react-router-dom';
const CreatePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

      
    axios.post(`${process.env.REACT_APP_URL}/notice/notify`, 
    { // 요청 본문
      title: title,
      content: content,
    },
    { // 설정 객체
      headers: { Authorization: `${localStorage.getItem("token")}` },
    }
  )
  .then(response => {
    console.log('게시글이 성공적으로 등록되었습니다.');
    
    // 게시글 등록 후 /notice로 이동합니다.
    navigate('/notice');
      })
      .catch(error => console.error('Error:', error));
    
    setTitle('');
    setContent('');
};

return (
  <form onSubmit={handleFormSubmit} className="post-form">
    <label className="post-label">
      제목:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </label>
    <label className="post-label">
      내용:
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    </label>
    <button type="submit">등록</button>
  </form>
);
};

export default CreatePostPage;
