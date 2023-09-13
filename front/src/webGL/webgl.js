import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Edukit from "./loader";
import GUI from "lil-gui";
import "../css/gui.css";
import "../css/dash.css";

function WebGL() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [chipOn, setChipOn] = useState();
  
  

  // Add these lines
  const currentX = useRef(x);
  const currentY = useRef(y);
  const currentchip = useRef(chipOn);

  const edukitRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.88:8081");


    ws.addEventListener("open", () => {
      console.log("WebSocket connection.");
    });

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);
      // console.log(receivedMessage)

      if (receivedMessage.Wrapper) {
        
        const tag3 = receivedMessage.Wrapper.find((item) => item.tagId === "3");
        const tag4 = receivedMessage.Wrapper.find((item) => item.tagId === "4");
        const tag21 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "21"
        );
        const tag22 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "22"
        );
       
        myObject.NO1 = tag3 && tag3.value ? "#00FF00" : "#FF0000";
        myObject.NO2 = tag4 && tag4.value ? "#00FF00" : "#FF0000";
        myObject.NO3 = tag21 && tag21.value >= 1 ? "#00FF00" : "#FF0000";
        no1.setValue(myObject.NO1);
        no2.setValue(myObject.NO2);
        no3.setValue(myObject.NO3);
        

        setX(tag21.value);
        setY(tag22.value);
        setChipOn(tag3.value);
        currentX.current = tag21.value;
        currentY.current = tag22.value;
        currentchip.current = tag3.value;
        
      }
    });
// 화면 비율
    const canvas = document.querySelector("#webgl");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      (window.innerWidth * 0.45) / (window.innerHeight * 0.85),
      0.1,
      1000
    );

    camera.position.set(50, 50, 70);
    scene.add(camera);

    const guiContainer = document.createElement("div");
    guiContainer.classList.add("gui-container");
    document.body.appendChild(guiContainer);

    const gui = new GUI({ autoPlace: false });
    guiContainer.appendChild(gui.domElement);

    const edukit = new Edukit(); // edukit을 한 번만 불러옵니다.
    edukit.fileload(scene);

    edukitRef.current = edukit;

    const myObject = {
      start: function () {
        const data = JSON.stringify({ tagId: "1", value: "1" });
        ws.send(data);
      },
      stop: function () {
        const data = JSON.stringify({ tagId: "1", value: "0" });
        ws.send(data);
      },
      NO1: "#FF0000",
      NO2: "#FF0000",
      NO3: "#FF0000",
      reset: function () {
        const data = JSON.stringify({ tagId: "8", value: "1" });
        ws.send(data);
      },
    };

    
    const [minY, maxY] = [0, 18000000];
    const [minX, maxX] = [0, 1030000];

    // yAxisFunc 함수는 num 속성 값을 슬라이더의 높이로 변환하는 함수입니다. 
    // 해당 슬라이더는 min에서 max 사이의 값을 0에서 7 사이의 값으로 변환합니다.
    const yAxisFunc = (value) => {
      return ((value - minY) / (maxY - minY)) * 7;
    };
//xAxisFunc 함수는 num2 속성 값을 슬라이더의 각도로 변환하는 함수입니다. 
//해당 슬라이더는 min에서 max 사이의 값을 0에서 90도 사이의 각도로 변환합니다.
    const xAxisFunc = (value) => {
      return ((value - minX) / (maxX - minX)) * THREE.MathUtils.degToRad(90);
    };
    gui.add(myObject, "start");
    gui.add(myObject, "stop");

    const no1 = gui.addColor(myObject, "NO1");
    const no2 = gui.addColor(myObject, "NO2");
    const no3 = gui.addColor(myObject, "NO3");
    gui.add(myObject, "reset");

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth * 0.45, window.innerHeight * 0.85);

    // .Right 클래스에 맞게 캔버스 크기를 설정
    const rightElement = document.querySelector(".Right");

    // 캔버스 크기 업데이트
    function updateCanvasSize(){

    const rightWidth = rightElement.clientWidth;
    const rightHeight = rightElement.clientHeight;

    // .Right의 가로와 세로 비율에 맞춰 카메라 비율 조절
    camera.aspect = rightWidth/rightHeight; 
    renderer.setSize(rightWidth, rightHeight);
    }
    
    // 초기 화면 크기 설정
    updateCanvasSize();

    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x1c2631);

    // 윈도우 크기가 변경될 때마다 크기 업데이트
    window.addEventListener("resize", () => {
      updateCanvasSize();
      // camera.aspect = window.innerWidth / window.innerHeight;
      // camera.updateProjectionMatrix();
      // renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    new OrbitControls(camera, renderer.domElement);

    let requestId = null;
    const tick = () => {
      renderer.render(scene, camera);

      requestId = requestAnimationFrame(tick);
      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();

      if (edukitRef.current && edukitRef.current.loaded) {
        // console.log("-------------------Y", currentY.current);
        // console.log("-------------------X", currentX.current);
        edukitRef.current.actionY(yAxisFunc(currentY.current));
        edukitRef.current.actionX(xAxisFunc(currentX.current));
        edukitRef.current.actionChip(currentchip.current);


      }
    };

    tick();

    return () => {
      cancelAnimationFrame(requestId);
      ws.close();
      guiContainer.remove();
    };
  }, []);

  return (
        <div className="Right" >
          <canvas id="webgl" 
              style={{ borderRadius: "30px",
                        padding: '1%'}}></canvas>
        </div>
    
  );
}

export default WebGL;
