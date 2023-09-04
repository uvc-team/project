import React,{ useState, useEffect }from 'react';
import './homePage.css';

const HomePage = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // 나타나기 선언

  // 스크롤 이벤트 핸들러 등록
  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치를 감지하여 스크롤 위치 상태 업데이트
      setScrollPosition(window.scrollY);

      // 요소가 화면에 나타날 때 애니메이션 적용
      const windowHeight = window.innerHeight;
      if (scrollPosition> windowHeight/2){
        setIsVisible(true);
      }
      else{setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);


  // 공통 설명 텍스트
  const text = {
    color: 'white',
    fontSize: '50px',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    display: isHovering ? 'block' : 'none',
    position: 'absolute',
      top: '20%', // 수직 중앙 정렬
      left: '45%', // 수평 중앙 정렬
    };
  
  //화사소개 블럭
  const divStyle = { 
  backgroundImage: 'url(images/imag1.jpg)',
  width: '453px',
  height: '680px',
  backgroundSize:'cover',
  position: 'absolute',
  top:'1166px',
  marginLeft:'25px',
  transition: 'opacity 0.5s',// 애니메이션 속성 설정
  opacity: isVisible ? 1 : 0, // 요소의 불투명도를 0 또는 1로 설정하여 나타냄
  //backgroundColor: isHovering ? 'rgba(58,191,220,0.7)' : 'transparent', // 마우스 오버 시 배경 색상을 파란색으로 변경
// 배경 색상 전환에 애니메이션 적용
};

//직원 소개 블럭
const divStyle2 = {
  backgroundImage: 'url(images/imag2.jpg)',
  width: '453px',
  height: '680px',
  backgroundSize:'cover',
  position: 'absolute',
  top:'1166px',
  marginLeft: '493px',
  transition: 'opacity 0.5s',// 애니메이션 속성 설정
  opacity: isVisible ? 1 : 0, // 요소의 불투명도를 0 또는 1로 설정하여 나타냄
// 배경 색상 전환에 애니메이션 적용
};


//아이디어 소개 블럭
const divStyle3 = {
  backgroundImage: 'url(images/imag3.jpg)',
  width: '453px',
  height: '680px',
  backgroundSize:'cover',
  position: 'absolute',
  top:'1166px',
  marginLeft:'961px',
  transition: 'opacity 0.5s',// 애니메이션 속성 설정
  opacity: isVisible ? 1 : 0,

}

     return (
    <>
      <div style={{
      backgroundImage: 'url(images/homPage.jpg)',
      backgroundSize: 'cover',
      display: 'flex',
      width: 'auto',
      height: '909px',
      flexDirection: 'column',
      position: 'relative'
      }}>

        <div className = 'box3'>
        <h1 className='textStyle2'> 안전을 우선으로 
        <br />
         정확한 진단, 빠른 대처 </h1>
        </div>       
    </div>
    {/* 회사 소개 블럭 */}
    <div style={divStyle}
    id="animation-element" > 
      <p style={text}>회사 소개</p>
    </div>

    {/* 화면의 현재 스크롤 위치 표시*/}
    <div style={{ position: 'fixed', top: 0, left: 0, backgroundColor: 'white' }}>
        현재 스크롤 위치: {scrollPosition}
      </div>

    {/* 직원 소개 블럭*/}
    <div style={divStyle2}
    id="animation-element" > 
    </div>

{/* 아이디어 소개 블럭 */}
   < div style={divStyle3}
    id="animation-element" > 
    </div>

    </>
    
  );
};

export default HomePage;