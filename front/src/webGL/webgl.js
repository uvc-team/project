import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import Stats from "three/examples/jsm/libs/stats.module";
import Edukit from "./loader";
import "../css/gui.css";

function WebGL() {
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    ws.addEventListener("open", () => {
      console.log("WebSocket connection.");
    });

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage.Wrapper) {
        const tag3 = receivedMessage.Wrapper.find((item) => item.tagId === "3");
        const tag4 = receivedMessage.Wrapper.find((item) => item.tagId === "4");
        const tag21 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "21"
        );

        myObject.NO1 = tag3 && tag3.value ? "#00FF00" : "#FF0000";
        myObject.NO2 = tag4 && tag4.value ? "#00FF00" : "#FF0000";
        myObject.NO3 = tag21 && tag21.value >= 1 ? "#00FF00" : "#FF0000";

        no1.setValue(myObject.NO1);
        no2.setValue(myObject.NO2);
        no3.setValue(myObject.NO3);

        console.log(
          "Updated colors:",
          myObject.NO1,
          myObject.NO2,
          myObject.NO3
        );
      }
    });

    const canvas = document.querySelector("#webgl");
    const scene = new THREE.Scene();
    const edukit = new Edukit();
    edukit.fileload(scene);
    const camera = new THREE.PerspectiveCamera(
      45,
      (window.innerWidth * 3) / (window.innerHeight * 5),
      0.1,
      1000
    );
    camera.position.x = 5;
    camera.position.z = 50;
    camera.position.y = 30;
    scene.add(camera);

    const stats = new Stats();
    document.querySelector(".container").appendChild(stats.dom);

    const guiContainer = document.createElement("div");
    guiContainer.classList.add("gui-container");
    document.body.appendChild(guiContainer);

    // Create GUI and append to container
    const gui = new GUI({ autoPlace: false });
    guiContainer.appendChild(gui.domElement);

    const myObject = {
      start: function () {
        const data = JSON.stringify({ tagId: "1", value: "1" });
        ws.send(data);
      },
      stop: function () {
        const data = JSON.stringify({ tagId: "1", value: "0" });
        ws.send(data);
      },
      NO1: "#FF0000", // 수정: 초기 색상값을 직접 지정
      NO2: "#FF0000",
      NO3: "#FF0000",
    };

    gui.add(myObject, "start");
    gui.add(myObject, "stop");

    const no1 = gui.addColor(myObject, "NO1");
    const no2 = gui.addColor(myObject, "NO2");
    const no3 = gui.addColor(myObject, "NO3");

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth * (3 / 5), window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x333333);

    window.addEventListener("resize", () => {
      camera.aspect = (window.innerWidth * 3) / (window.innerHeight * 5);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * (3 / 5), window.innerHeight);
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
      ws.close();
      guiContainer.remove();
    };
  }, []);

  return (
    <div>
      <div className="container"></div>
      <canvas id="webgl"></canvas>
    </div>
  );
}

export default WebGL;
