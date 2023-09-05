import React from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import "./css/App.css";
import Login from "./component/login";
import Logout from "./component/Logout";
import GraphComponent from "./component/Graph";
import HomePage from "./component/Home";
import MainPage from "./component/Main";
import KakaoOauth from "./component/kakao";
import WebGL from "./component/webgl";

// Navbar import
// Logo 컴포넌트는 이제 Navbar 내에서 사용됩니다.

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to={"/"}>Home</Link>
          <Link to={"/webgl"}>3D MODEL</Link>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/webgl" element={<WebGL />} />
            <Route path="/chart" element={<GraphComponent />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/kakao" element={<KakaoOauth />} />
            <Route path="/homePage" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
