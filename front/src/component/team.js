import React from 'react';
import './team.css';

const Team = () => (
    <div className="wrapper">
        <ul className="team">
            <li className="team-item">
                <div className="profile profile_red"> 
                    <img src="/kangwoo.jpg" alt="Profile" />
                    <div className="profile-contents">
                        <h2>함석준<span>AIOT</span></h2>
                        <p>AI, IOT, 기획, 스마트팩토리</p>
                    </div>
                </div>
            </li>
            <li className="team-item">
                <div className="profile profile_beige"> 
                    <img src="/kangwoo.jpg" alt="Profile" />
                    <div className="profile-contents">
                        <h2>함석준<span>AIOT</span></h2>
                        <p>AI, IOT, 기획, 스마트팩토리</p>
                    </div>
                </div>
            </li>
            <li className="team-item">
                <div className="profile profile_beige"> 
                    <img src="/kangwoo.jpg" alt="Profile" />
                    <div className="profile-contents">
                        <h2>함석준<span>AIOT</span></h2>
                        <p>AI, IOT, 기획, 스마트팩토리</p>
                    </div>
                </div>
            </li>
            <li className="team-item">
                <div className="profile profile_beige">  
                    <img src="/kangwoo.jpg" alt="Profile" />
                    <div className="profile-contents">
                        <h2>함석준<span>AIOT</span></h2>
                        <p>AI, IOT, 기획, 스마트팩토리</p>
                    </div>
                </div>
            </li>
        </ul>

    </div>
    );

export default Team;