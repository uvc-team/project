import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GraphComponent from "./Chart/Graph";
import Dash from "./Chart/dash";
import KakaoOauth from "./component/user/kakao";
import HomePage from "./component/HomePage";
import "../src/css/App.css";
import JoinModal from "../src/Modal/joinModal";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/chart" element={<GraphComponent />} />
          <Route path="/kakao" element={<KakaoOauth />} />
          <Route path="/join" element={<JoinModal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
