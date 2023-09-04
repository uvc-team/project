import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import Edukit from "./loader";

function WebGL() {
  const [messagePayload, setMessagePayload] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

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
    camera.position.x = 20;
    camera.position.z = 20;
    camera.position.y = 10;
    scene.add(camera);

    const stats = new Stats();
    document.querySelector(".container").appendChild(stats.dom);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    renderer.setClearColor(0xfffff);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    const directionalLight = new THREE.DirectionalLight();
    // scene.add(ambientLight);
    scene.add(directionalLight);

    const control = new OrbitControls(camera, renderer.domElement);

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
          edukit.actionX(parseFloat(Tag21.value)); // Tag21.value를 숫자로 파싱하여 전달
        }

        // group3에서 Tag22를 사용하여 Y 축 움직임
        if (Tag22 && Tag22.value) {
          edukit.actionY(parseFloat(Tag22.value)); // Tag22.value를 숫자로 파싱하여 전달
        }
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(requestId);
      ws.close();
    };
  }, []);

  return (
    <div>
      <div className="container" style={{ display: "flex" }}></div>
      <canvas id="webgl"></canvas>
    </div>
  );
}

export default WebGL;
