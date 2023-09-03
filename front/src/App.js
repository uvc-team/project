import React from "react";
import { BrowserRouter, Route, Routes ,Navigate } from "react-router-dom";

import HomePage from "./page/Main/homePage";
import Home from "./page/Login/Join";
import Login from "./page/Login/login";
import Logout from "./page/Login/Logout";
import GraphComponent from "./GraphComponent";


import MainPage from "./page/Main/Main";
import KakaoOauth from "./page/Login/kakao";

// Navbar import
// Logo 컴포넌트는 이제 Navbar 내에서 사용됩니다.
// Logo와 헤더 푸터는 컴포턴트 폴더로 이동하였습니다.
import Navbar from './components/navbar';



function App() {
  return (
    <BrowserRouter>
     <div className="App">
        {/* 로고 삭제 */}
        
        {/* Navbar 추가 */}
        {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/Join" exact element={<Home />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        {/* 새로운 Route 추가 */}
        <Route path="/chart" element={<GraphComponent />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/kakao" element={<KakaoOauth />} />
      </Routes>
      {/* <Navbar /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
