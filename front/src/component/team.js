import React from "react";
import "../css/team.css";
import "../../src/css/homePage.css";

const Team = () => (
  <div className="wrapper">
    {/* 사장 */}
    <div className="uswer1 profile">
      <li className="team-item">
        {/* <img src="/kangwoo.jpg" alt="Profile" /> */}
        <div className="profile-contents">
          <h2>
            함석준<span>AIOT</span>
          </h2>
          <p>AI, IOT, 기획, 스마트팩토리</p>
        </div>
      </li>
    </div>
    {/* 매니저 */}
    <ul className="wrapperBox">
      {/* 매니저 1 */}
      <div className="uswer1 profile">
        <li className="team-item">
          {/* <img src="/kangwoo.jpg" alt="Profile" /> */}
          <div className="profile-contents">
            <h2>
              함석준<span>AIOT</span>
            </h2>
            <p>AI, IOT, 기획, 스마트팩토리</p>
          </div>
        </li>
      </div>
      {/* 매니저 2 */}
      <div className="uswer1 profile">
        <li className="team-item">
          {/* <img src="/kangwoo.jpg" alt="Profile" /> */}
          <div className="profile-contents">
            <h2>
              함석준<span>AIOT</span>
            </h2>
            <p>AI, IOT, 기획, 스마트팩토리</p>
          </div>
        </li>
      </div>
      {/* 매니저 3 */}
      <div className="uswer1 profile">
        <li className="team-item">
          {/* <img src="/img00.jpg" alt="Profile" /> */}
          <div className="profile-contents">
            <h2>
              함석준<span>AIOT</span>
            </h2>
            <p>AI, IOT, 기획, 스마트팩토리</p>
          </div>
        </li>
      </div>
    </ul>
  </div>
);

export default Team;
