import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyPage from "./myPage";
import Home from "./Home";
import Login from "./login";
import Logout from "./MainPage";
import GraphComponent from "./GraphComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MainPage" element={<Logout />} />
        {/* 새로운 Route 추가 */}
        <Route path="/chart" element={<GraphComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
