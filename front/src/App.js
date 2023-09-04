import React from "react";
import { BrowserRouter, Route, Routes ,Navigate } from "react-router-dom";
import "./App.css";
import Login from "./login";
import Logout from "./Logout";
import GraphComponent from "./GraphComponent";
import HomePage from "./Home";
// Logo import 삭제
// import Logo from "./Logo"; 
import MainPage from "./Main";
import KakaoOauth from "./kakao";


// Navbar import
// Logo 컴포넌트는 이제 Navbar 내에서 사용됩니다.

function App() {
  return (
    <BrowserRouter>
     <div className="App">
        {/* 로고 삭제 */}
        {/* <div className="logo-container">
            <Logo />
        </div> */}
        
        {/* Navbar 추가 */}

      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        {/* 새로운 Route 추가 */}
        <Route path="/chart" element={<GraphComponent />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/kakao" element={<KakaoOauth />} />
        <Route path="/homePage" element={<HomePage />} />
      </Routes>
      {/* <Navbar /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;