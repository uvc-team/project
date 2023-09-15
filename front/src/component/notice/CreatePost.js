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
      window.location.reload(navigate("/"));
    })
    .catch(error => console.error('Error:', error));
    
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h1 style={{ color: '#000', textAlign: 'center', marginTop: '100px' }}>게시글 작성</h1>
      
      <form onSubmit={handleFormSubmit} className="post-form">
        <label className="post-label" style={{ display: 'block', marginTop: '20px' }}>
          제목:
          <br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width:'900px', height:'50px' }} />
        </label>
        
        <label className="post-label" style={{ display: 'block', marginTop: '50px' }}>
          내용:
          <br />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ width:'900px', height:'300px' }} />
          <br />

        </label>
        <button type="submit" style={{ alignSelf:'end'}}>등록</button>

        
      </form>
      
   </div> 
);
};

export default CreatePostPage;