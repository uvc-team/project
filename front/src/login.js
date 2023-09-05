import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_URL;

const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 이메일과 비밀번호를 서버로 보내는 요청
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        withCredentials: true,
      });
      console.log(formData);
      console.log(`response: ${response}`);

      // 서버에서 응답을 받으면 원하는 동작을 수행할 수 있습니다.
      console.log("회원 가입 성공:", response.data);

      // 예를 들어, 회원 가입이 성공했을 때 MyPage로 이동할 수 있습니다.
      navigate("/Mainpage");
    } catch (error) {
      // 오류 처리
      console.error("error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Home</h1>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일"
      />
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      <button type="submit">전송</button>
      <button
        onClick={() => {
          navigate("/MainPage");
        }}
      >
        Go to MyPage
      </button>
    </form>
  );
};

export default Login;
