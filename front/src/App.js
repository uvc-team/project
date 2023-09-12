import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GraphComponent from "./Chart/Graph";
import Dash from "./Chart/dash";
import KakaoOauth from "./component/user/kakao";
import HomePage from "./component/HomePage";
import LoginPage from "./component/loginPage";
import Profile from "./component/user/proflie";
import MasterProfile from "./component/rankProfile/master";
import "../src/css/App.css";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/chart" element={<GraphComponent />} />
          <Route path="/kakao" element={<KakaoOauth />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/master" element={<MasterProfile />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
