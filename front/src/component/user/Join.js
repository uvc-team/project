import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../userCss/user.css';

const Join = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    nick: "",
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
      // 이메일과 비밀번호를 서버로 보내는 POST 요청
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/signup`,
        formData
      );
      console.log(formData);
      console.log(`response: ${response}`);

      // 서버에서 응답을 받으면 원하는 동작을 수행할 수 있습니다.
      console.log("회원 가입 성공:", response.data);

      // 예를 들어, 회원 가입이 성공했을 때 MyPage로 이동할 수 있습니다.
      navigate("/main");
    } catch (error) {
      // 오류 처리
      console.error("회원 가입 오류:", error);
    }
  };

  return (
    <form className="joinBox"
    onSubmit={handleSubmit}>
      <form className="logoBox">
      <p className="texStyle">email</p>

<input className="joinInput"
  type="email"
  id="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="이메일"
/>
<p className="texStyle">nick</p>
<input 
className="joinInput"
  type="nick"
  id="nick"
  name="nick"
  value={formData.nick}
  onChange={handleChange}
  placeholder="닉네임"
/>
<p className="texStyle">password</p>
<input 
className="joinInput"
  type="password"
  id="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="비밀번호"
/>
      </form>
      <button className="button"
  type="submit">
  전송
</button>
    </form>
  );
};

export default Join;
