import React from 'react';
import '../userCss/profile.css';

export default function Profile(){
    return(
        <div className='proFileBackground'>
            <div className='profileBox'>
                <div className='userProfile'>
                    <p className='texStyle'
                        style={{
                            marginTop: '35%',
                            marginBottom: '5%',
                            fontSize: '25px'
                        }}>" 안녕하세요 OO님 "</p>
                    <div className='userImg' />
                    <p className='texStyle'
                        style={{
                            marginTop: '5%',
                        }}>OOO</p>
                    <p className='texStyle'
                        style={{
                            marginTop:'-3%',
                        }}>123@email.com </p>
                </div>
                <div className='dataBox'>

                </div>
            </div>
        </div>
    );
}