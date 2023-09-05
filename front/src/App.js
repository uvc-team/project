import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./css/App.css";
import Login from "./component/login";
import Logout from "./component/Logout";
import GraphComponent from "./component/Graph";
import HomePage from "./component/Home";
import MainPage from "./component/Main";
import KakaoOauth from "./component/kakao";
import WebGL from "./component/webgl";
import Header from "./component/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
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
    </BrowserRouter>
  );
}

export default App;
