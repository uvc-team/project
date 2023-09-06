import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      // 서버에서 응답을 받으면 원하는 동작을 수행할 수 있습니다.
      console.log("회원 가입 성공:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);

        console.log("Saved token:", localStorage.getItem("token")); // 확인용

        // 예를 들어, 회원 가입이 성공했을 때 MyPage로 이동할 수 있습니다.
        navigate("/homepage");
      } else {
        throw new Error("토큰이 없습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("error:", error);
    }
  };

  return (
    <form className="modalBox" 
    onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <p className="styleText">  
        email</p>
      <input
      className="inputStyle"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일"
      />
      <p className="styleText">  
        password</p>
      <input
      className="inputStyle"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      <button type="submit">전송</button>
    </form>
  );
};

export default Login;
