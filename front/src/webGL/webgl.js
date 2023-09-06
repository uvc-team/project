<<<<<<< HEAD:front/src/component/webgl.js
import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import Stats from "three/examples/jsm/libs/stats.module";
import Edukit from "./loader";

function WebGL() {
  const [messagePayload, setMessagePayload] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    ws.addEventListener("open", () => {
      console.log("WebSocket connection.");
    });

    ws.addEventListener("message", (event) => {
      const receivedMessage = event.data;
      setMessagePayload(JSON.parse(receivedMessage));
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
        const data = JSON.stringify({ tagId: "1", value: "1" });
        ws.send(data);
      },
      stop: function () {
        const data = JSON.stringify({ tagId: "1", value: "0" });
        ws.send(data);
      },
      NO1: "##FF0000",
      NO2: "##FF0000",
      NO3: "##FF0000",
    };

    gui.add(myObject, "start");
    gui.add(myObject, "stop");

    const no1 = gui.addColor(myObject, "NO1");
    const no2 = gui.addColor(myObject, "NO2");
    const no3 = gui.addColor(myObject, "NO3");

    const updateColors = () => {
      const tag3 = messagePayload.Wrapper
        ? messagePayload.Wrapper.find((item) => item.tagId === "3")
        : "n";
      const tag4 = messagePayload.Wrapper
        ? messagePayload.Wrapper.find((item) => item.tagId === "4")
        : "n";
      const tag40 = messagePayload.Wrapper
        ? messagePayload.Wrapper.find((item) => item.tagId === "40")
        : "n";

      myObject.NO1 = tag3 && tag3.value ? "#00FF00" : "#FF0000";
      myObject.NO2 = tag4 && tag4.value ? "#00FF00" : "#FF0000";
      myObject.NO3 = tag40 && tag40.value ? "#00FF00" : "#FF0000";

      // Update GUI color controls to reflect the new values
      no1.setValue(myObject.NO1);
      no2.setValue(myObject.NO2);
      no3.setValue(myObject.NO3);
    };

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

      if (edukit.loaded) {
        updateColors();
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(requestId);
      ws.close();
      if (messagePayload) {
        messagePayload.close();
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
=======
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
>>>>>>> f64a202d78ed415d2a85da293630efb94fcb6530:front/src/webGL/webgl.js
