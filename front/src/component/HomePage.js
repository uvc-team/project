import React, { useEffect, useRef, useState } from "react";
import "../css/homePage.css";
import Header from "../Header/header";

const HomePage = (props) => {
  const elementRefs = [useRef(null), useRef(null), useRef(null)];
  const [isVisible, setIsVisible] = useState([false, false, false]);
  const [numValue, setNumValue] = useState(0);

  useEffect(() => {
    const handleIntersection = (entries, index) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = true;
            return newVisibility;
          });
          //div 확인용 콘솔
          console.log(`${entry.target.className} is in the viewport`);
        }
      });
    };

    const observers = elementRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          handleIntersection(entries, index);
        },
        {
          root: null, // 루트 요소를 지정하지 않음 (화면 전체 관찰)
          threshold: 0.1, // 엘리먼트가 화면 뷰포트의 80% 이상 보일 때 실행
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, []);

  return (
<<<<<<< HEAD
    <div><Header />
    <div className="homeBody">
      {/* 화면1 */}
      <div className="homePage1Box">
        {/* 나타나는 애니메이션 */}
        <div
          className={`homePage1 ${isVisible[0] ? "visible" : ""}`}
          ref={elementRefs[0]}
        >
          <div className="homeBox1" >
            <div className="homePage1LOGO" />
          </div>
          
          
          
        </div>
      </div>
      {/* 화면2 */}
      <div className="homePage2Box">
        <div className="homePage2">
          <div className="homeBox2"></div>
        </div>
      </div>
      {/* 화면3 */}
      <div className="homePage3Box">
        <div className="homePage3">
          <p
            style={{
              fontSize: "75px",
              marginRight: "10%",
            }}
            className="homePageTextW"
=======
    <div>
      <Header numValue={numValue} setNumValue={setNumValue} />
      <div className="homeBody">
        {/* 화면1 */}
        <div className="homePage1Box">
          {/* 나타나는 애니메이션 */}
          <div
            className={`homePage1 ${isVisible[0] ? "visible" : ""}`}
            ref={elementRefs[0]}
>>>>>>> ec99f3a4c8b324e94739be1783bc3afbf8be7a2a
          >
            <div className="homeBox1"></div>
          </div>
        </div>
        {/* 화면2 */}
        <div className="homePage2Box">
          <div className="homePage2">
            <div className="homeBox2"></div>
          </div>
        </div>
        {/* 화면3 */}
        <div className="homePage3Box">
          <div className="homePage3">
            <p
              style={{
                fontSize: "200px",
                marginRight: "10%",
              }}
              className="homePageTextW"
            >
              Efficient
            </p>

<<<<<<< HEAD
          <p
            style={{
              fontSize: "75px",
              marginRight: "10%",
            }}
            className="homePageTextB"
          >
            MONITERING
          </p>
=======
            <p
              style={{
                fontSize: "200px",
                marginRight: "10%",
              }}
              className="homePageTextB"
            >
              MONITERING
            </p>
          </div>
>>>>>>> ec99f3a4c8b324e94739be1783bc3afbf8be7a2a
        </div>
        <div className="homePage3_2Box">
            <div className="homeBody3_2Icon" />
            <p className="homePageTextW">
              <p style={{
                marginTop: "10%",
                textAlign: 'center',
                fontSize: '10px'
              }}
                className="homePageTextW">
                이미 작동 중인 공장에서 우리의 솔루션을 도입하면 모니터링이 쉽고 효율적으로 이루어집니다.<br />
                관리자 모니터링 페이지를 통해 실시간으로 공정 데이터를 확인하고 <br />
                오류 및 오차율을 신속하게 감지하여 조치할 수 있습니다.
                </p>
            </p>
            <div className="homeBody3Logo" />
            
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
