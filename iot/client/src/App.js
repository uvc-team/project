import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import WebGL from "./Webgl";

function App() {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const startToEdukit = () => {
    if (webSocket) {
      const data = JSON.stringify({ tagId: "1", value: "1" });
      webSocket.send(data);
      console.log("Data sent to the server: 1");
    }
  };
  const stopToEdukit = () => {
    if (webSocket) {
      const data = JSON.stringify({ tagId: "1", value: "0" });
      webSocket.send(data);
      console.log("Data sent to the server: 0");
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to={"/"}>Home</Link>
          <Link to={"/webgl"}>3D MODEL</Link>
          <button onClick={startToEdukit}>시작</button>
          <button onClick={stopToEdukit}>중지</button>
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
//
