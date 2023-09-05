import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./css/App.css";
import Login from "./component/login";
import Logout from "./component/Logout";
import GraphComponent from "./component/Graph";
import HomePage from "./component/Home";
import MainPage from "./component/Main";
import KakaoOauth from "./component/kakao";
import Dash from "./component/dash";
import Profile from "./component/profile";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/webgl" element={<Dash />} />
          <Route path="/chart" element={<GraphComponent />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/kakao" element={<KakaoOauth />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
