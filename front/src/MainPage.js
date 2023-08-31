import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://192.168.0.124:3000'

const Logout = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // 이메일과 비밀번호를 서버로 보내는 요청
        const response = await axios.get(`${API_URL}/auth/logout`);
        const { login } = response.data;
        if (login) {
            localStorage.removeItem('token');
            // 서버에서 응답을 받으면 원하는 동작을 수행할 수 있습니다.
            console.log('로그아웃:', response.data);

      // 예를 들어, 회원 가입이 성공했을 때 MyPage로 이동할 수 있습니다.
      navigate('/Home');}
    } catch (error) {
      // 오류 처리
      console.error('로그아웃오류:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>MainPage</h1>
      <button type="logout">로그아웃</button>
      <button
        onClick={() => {
          navigate('/Home');
        }}
      >
        Go
      </button>
    </form>
  );
};

export default Logout;
