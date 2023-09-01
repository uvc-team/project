// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import WebGL from "./Webgl";

// function App() {
//   const [messagePayload, setMessagePayload] = useState("");

//   useEffect(() => {
//     const ws = new WebSocket("ws://192.168.0.124:8081"); // 백엔드 서버의 WebSocket 주소

//     ws.addEventListener("message", function (event) {
//       const receivedMessage = event.data;
//       console.log("Received message from server:", receivedMessage);
//       setMessagePayload(receivedMessage);
//     });

//     return () => {
//       ws.close(); // 컴포넌트 언마운트 시 WebSocket 연결 종료
//     };
//   }, []);

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <header className="App-header">
//           <Link to={"/"}>Home</Link>
//           <p>The message payload is: {messagePayload}</p>{" "}
//           {/* MQTT 메시지를 출력 */}
//         </header>
//         <div className="content">
//           <Routes>
//             <Route path="/webgl" element={<WebGL />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
// //sss
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import WebGL from "./Webgl";

function App() {
  const [messagePayload, setMessagePayload] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081"); // 백엔드 서버의 WebSocket 주소

    ws.addEventListener("message", function (event) {
      const receivedMessage = event.data;
      console.log("Received message from server:", receivedMessage);
      setMessagePayload(receivedMessage);
    });

    return () => {
      ws.close(); // 컴포넌트 언마운트 시 WebSocket 연결 종료
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to={"/"}>Home</Link>
          <p>The message payload is: {messagePayload}</p>{" "}
          {/* MQTT 메시지를 출력 */}
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
//sss
