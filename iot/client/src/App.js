import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";
import "./App.css";
import WebGL from "./Webgl";

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
            <Route path="/webgl" element={<WebGL />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
