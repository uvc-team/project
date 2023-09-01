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

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // const standardMaterial = new THREE.MeshStandardMaterial({
    //   color: 0xffff00,
    // });
    // standardMaterial.transparent = true;
    // standardMaterial.opacity = 0.6;
    // standardMaterial.wireframe = true;

    // const standardMaterial2 = new THREE.MeshStandardMaterial({
    //   color: 0xffff00,
    // });
    // standardMaterial2.wireframe = true;

    // const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);

    // const group = new THREE.Group();

    // const mesh = new THREE.Mesh(boxGeometry, standardMaterial);
    // mesh.name = "background-color";
    // mesh.scale.set(0.1, 0.1, 0.1);
    // mesh.position.y = 0.5;
    // group.add(mesh);

    // const mesh2 = new THREE.Mesh(boxGeometry.clone(), standardMaterial2);
    // group.add(mesh2);
    // mesh2.name = "redirect";

    // scene.add(group);

    // group.position.x = 0.5;

    // console.log(group)
    // edukit.actionX(THREE.MathUtils.degToRad(90));

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

    //const raycaster = new THREE.Raycaster();
    //let pointer = new THREE.Vector2(0, 0);

    // canvas.addEventListener("click", e => {
    //     pointer.setX((e.offsetX / window.innerWidth) * 2 - 1) // 범위는 -1 ~ 1
    //     pointer.setY(-(e.offsetY / window.innerHeight) * 2 + 1) // 범위는 -1 ~ 1
    //     raycaster.setFromCamera(pointer, camera);
    //     const intersects = raycaster.intersectObjects(scene.children)
    //     // const intersect = [...intersects.map(p => p.name === '?')]
    //     if (intersects.length > 0){
    //         const intersect = intersects[0];
    //         intersect.object.material.color.set(THREE.MathUtils.randInt(0x000000, 0xffffff))
    //         if (intersect.object.name === 'background-color') {
    //             const app = document.querySelector(".App")
    //             // const app = document.querySelector(".App")
    //             // app.style.backgroundColor = "#ffff00"
    //             // app.classList.toggle("click")
    //         } else if (intersect.object.name === 'redirect') {
    //             // window.open("https://naver.com");
    //         }
    //     }
    // })

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
