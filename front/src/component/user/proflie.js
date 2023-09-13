import React from 'react';
import Logout from './Logout';

import '../userCss/profile.css';

export default function Profile() {
  return (
    <div className='proFileBackground'>
      <div className='profileBox'>
        <div className='userProfile'>
          <h2>안녕하세요 OO님</h2>
          <div className='userImg' />
          <p className='userTextBox'>
              <p>사람 </p>
              <p style={{
                fontSize: '5px',
              }}>123@email.com</p>
          </p>
          <Logout />
        </div>

       
        {/* 공지사항 */}
        <div className='dataBox'></div>
      </div>
      
    </div>
  );
}
