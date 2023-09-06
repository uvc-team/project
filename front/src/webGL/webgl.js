import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import Stats from "three/examples/jsm/libs/stats.module";
import Edukit from "./loader";

function WebGL() {
  //const [messagePayload, setMessagePayload] = useState("");
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    ws.addEventListener("open", () => {
      console.log("WebSocket connection established.");
      setWebSocket(ws);
    });

    ws.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
      // 여기서 필요한 처리를 수행하세요. 예를 들어 다시 연결 시도 등.
    });

    const canvas = document.querySelector("#webgl");
    const scene = new THREE.Scene();
    const edukit = new Edukit();

    edukit.fileload(scene);

    const camera = new THREE.PerspectiveCamera(
      45,
      (window.innerWidth * 2) / (window.innerHeight * 3),
      0.1,
      1000
    );
    camera.position.x = 5;
    camera.position.z = 50;
    camera.position.y = 30;
    scene.add(camera);

    const stats = new Stats();
    document.querySelector(".container").appendChild(stats.dom);

    const gui = new GUI();

    const myObject = {
      start: function () {
        if (webSocket) {
          const data = JSON.stringify({ tagId: "1", value: "1" });
          webSocket.send(data);
          console.log(data);
          console.log(1);
        }
      },
      stop: function () {
        if (webSocket) {
          const data = JSON.stringify({ tagId: "1", value: "0" });
          webSocket.send(data);
          console.log(data);
          console.log(2);
        }
      },
    };

    gui.add(myObject, "start");
    gui.add(myObject, "stop");

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth * (2 / 3), window.innerHeight);
    renderer.shadowMap.enabled = true;

    renderer.setClearColor(0x333333);

    window.addEventListener("resize", () => {
      camera.aspect = (window.innerWidth * 2) / (window.innerHeight * 3);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * (2 / 3), window.innerHeight);
    });

    const directionalLight = new THREE.DirectionalLight();
    scene.add(directionalLight);

    new OrbitControls(camera, renderer.domElement);

    let requestId = null;
    const tick = () => {
      renderer.render(scene, camera);
      requestId = requestAnimationFrame(tick);

      stats.update();
      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();
    };
    tick();

    return () => {
      cancelAnimationFrame(requestId);
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  return (
    <div className="WebGL-container">
      <div className="container" style={{ display: "flex" }}></div>
      <canvas id="webgl"></canvas>
    </div>
  );
}

export default WebGL;
