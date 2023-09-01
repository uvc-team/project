import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import Edukit from "./loader";

function WebGL() {
  useEffect(() => {
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

    const gui = new GUI({ autoPlace: false });
    document.querySelector(".container").appendChild(gui.domElement);

    const stats = new Stats();
    document.querySelector(".container").appendChild(stats.dom);

    const object = {
      num: -2728,
      num2: 0,
    };
    const folder = gui.addFolder("폴더이름");

    const [min, max] = [-2728, 53294192312];

    const yAxisFunc = (() => {
      return function () {
        return ((object.num - min) / (max - min)) * 7;
      };
    })();

    const xAxisFunc = (() => {
      return function () {
        return (
          ((object.num2 - min) / (max - min)) * THREE.MathUtils.degToRad(90)
        );
      };
    })();

    folder.add(object, "num", min, max, 0.1).name("rangebar").listen();
    folder.add(object, "num2", min, max, 0.01).name("rangebar2").listen();

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    scene.add(ambientLight);

    const control = new OrbitControls(camera, renderer.domElement);

    let requestId = null;
    const tick = () => {
      renderer.render(scene, camera);
      requestId = requestAnimationFrame(tick);

      stats.update();
      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();

      if (edukit.loaded) {
        edukit.actionY(yAxisFunc());
        edukit.actionX(xAxisFunc());
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(requestId);
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
