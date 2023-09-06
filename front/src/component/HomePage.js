import React, { useEffect, useRef, useState } from "react";
import '../css/homePage.css';

const HomePage = (props) => {
  const elementRefs = [useRef(null), useRef(null), useRef(null)];
  const [isVisible, setIsVisible] = useState([false, false, false]);

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
      const observer = new IntersectionObserver((entries) => {
        handleIntersection(entries, index);
      }, {
        root: null, // 루트 요소를 지정하지 않음 (화면 전체 관찰)
        threshold: 0.1, // 엘리먼트가 화면 뷰포트의 80% 이상 보일 때 실행
      });

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
    <div className="homeBody">
      {/* 화면1 */}
      <div className="homePage1Box">
          {/* 나타나는 애니메이션 */}
          <div className={`homePage1 ${isVisible[0] ? 'visible' : ''}`} ref={elementRefs[0]}>
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
              fontSize : "200px",
              marginRight: "10%",
            }}
            className="homePageTextW">Efficient</p>

             <p 
            style={{
              fontSize : "200px",
              marginRight: "10%",
            }}
            className="homePageTextB">MONITERING</p>
          </div>
        </div>




      </div>
      
  );
};

export default HomePage;
