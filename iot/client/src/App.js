import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import WebGL from "./Webgl";

function App() {
  const [messagePayload, setMessagePayload] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    ws.addEventListener("message", function (event) {
      const receivedMessage = event.data;
      console.log("Received message from server:", receivedMessage);
      setMessagePayload(receivedMessage);
    });

    return () => {
      ws.close();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to={"/"}>Home</Link>
          <Link to={"/webgl"}>3D MODEL</Link>
          <p>The message payload is: {messagePayload}</p>
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
