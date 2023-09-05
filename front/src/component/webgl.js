import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import Edukit from "./loader";

function WebGL() {
  const [messagePayload, setMessagePayload] = useState("");
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    setWebSocket(ws);

    ws.addEventListener("message", function (event) {
      const receivedMessage = event.data;

      setMessagePayload(JSON.parse(receivedMessage));
    });

    const canvas = document.querySelector("#webgl");
    const scene = new THREE.Scene();

    const edukit = new Edukit();
    edukit.fileload(scene);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = 5;
    camera.position.z = 50;
    camera.position.y = 30;
    scene.add(camera);

    const stats = new Stats();
    document.querySelector(".container").appendChild(stats.dom);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    renderer.setClearColor(0x333333);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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

      const Tag21 = messagePayload.Wrapper
        ? messagePayload.Wrapper.find((item) => item.tagId === "21")
        : null;
      const Tag22 = messagePayload.Wrapper
        ? messagePayload.Wrapper.find((item) => item.tagId === "22")
        : null;

      if (edukit.loaded) {
        if (Tag21 && Tag21.value) {
          edukit.actionX(parseFloat(Tag21.value));
        } else if (Tag22 && Tag22.value) {
          edukit.actionY(parseFloat(Tag22.value));
        }
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(requestId);
      ws.close();
    };
  }, [messagePayload.Wrapper]);

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
    <div className="WebGL-container">
      <div className="container" style={{ display: "flex" }}></div>
      <canvas id="webgl"></canvas>
    </div>
  );
}

export default WebGL;
