import React from 'react';
import './main.css';

const MainPage = () => {
    return (
         <div style={{
            backgroundImage: 'url(images/main.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh'
        }}> 
        <div className='box'>
            <h1 className='textStyle'>(주)함박오이</h1>
            <h3 className='textStyle1'>Safety first, Smart Factory</h3>
            
        </div>
        </div>


         
    );
};

export default MainPage;