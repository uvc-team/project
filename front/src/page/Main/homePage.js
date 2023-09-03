import React,{ useState, useEffect }from 'react';
import './homePage.css';

const HomePage = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [originalImage, setoriginalImage] = useState('url(images/images1.jpg)');
  const [isAnimated, setIsAnimated] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // 마우스 올렸을때 반응하는 핸들러 등록
  const handleMouseOver= () => {
    setIsHovering(true);
    setoriginalImage('none');
  };
  const handleMouseOut= () => {
    setIsHovering(false);
    setoriginalImage('url(images/images1.jpg)');
  };
// 스크롤 이벤트 핸들러 등록
  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치를 감지하여 스크롤 위치 상태 업데이트
      setScrollPosition(window.scrollY);

      // 요소가 화면에 나타날 때 애니메이션 적용
      const element = document.getElementById('animation-element');
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight/4) {
          setIsAnimated(true);
      }
    }};

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[]);
  
  
  const divStyle = { 
  backgroundImage: originalImage,
  width: '453px',
  height: '680px',
  backgroundSize:'cover',
  position: 'absolute',
  top:'95%',
  marginLeft:'25px',
  backgroundColor: isAnimated ? 'rgba(58,191,220,0.7)' : 'transparent', // 마우스 오버 시 배경 색상을 파란색으로 변경
// 배경 색상 전환에 애니메이션 적용
};
const text = {
  color: 'white',
  fontSize: '50px',
  textAlign: 'center',
  transform: 'translate(-50%, -50%)',
  display: isAnimated ? 'block' : 'none',
  position: 'absolute',
    top: '20%', // 수직 중앙 정렬
    left: '45%', // 수평 중앙 정렬
  };

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
    
    <div style={divStyle}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    id="animation-element" > 
      <p style={text}>회사 소개</p>
    </div>
    {/* 화면의 현재 스크롤 위치 표시*/}
    <div style={{ position: 'fixed', top: 0, left: 0, backgroundColor: 'white' }}>
        현재 스크롤 위치: {scrollPosition}
      </div>
    
    <div style={{
      backgroundImage: 'url(images/img2.jpg)',
      width: '453px',
    height: '680px',
    backgroundSize:'cover',
    position: 'absolute',
    top:'95%',
    marginLeft: '493px'
    }}>
    </div>

   < div style={{
      backgroundImage: 'url(images/img3.jpg)',
      width: '453px',
    height: '680px',
    backgroundSize:'cover',
    position: 'absolute',
    top:'95%',
    marginLeft:'961px'

    }}>
    </div>

    </>
    
  );
};

export default HomePage;