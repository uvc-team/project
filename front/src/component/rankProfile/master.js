import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Header/header";


import CompanyProfile from "./companyProfile";
import "../../css/profile.css";


function MasterProfile() {
  const [numValue, setNumValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedButton, setSelectedButton] = useState('button1');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/position/presidentPage`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const usersData = response.data.user;
        setUsers(usersData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    console.log(`Button ${buttonName} clicked`);
  };
  const handleRoleChange = (userId, newRole) => {
    axios
      .post(
        `${process.env.REACT_APP_URL}/position/roleChange`,
        {
          userId: userId,
          position: newRole,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="proFileBackground">
      <Header numValue={numValue} setNumValue={setNumValue} />

      <div className='profileBox'>
        <div className='userProfile'>
          <button onClick={() => handleButtonClick('button1')}>버튼1</button>
          <button onClick={() => handleButtonClick('button2')}>버튼2</button>
          <button onClick={() => handleButtonClick('button3')}>버튼3</button>
          <h2>'함 석 준'</h2>
          <div className='userImg'></div>
        </div>
        <div className="remainingSpace">
          {selectedButton === 'button1' && (
            <div>
              {users.map(user => (
                <div key={user.userId} className="userInfo">
                  <p>{user.name}, ({user.Position.role})</p>
                  <div className="buttonContainer">
                    <button onClick={() => handleRoleChange(user.userId, 'manager')}>
                      매니저 등록
                    </button>
                    <button onClick={() => handleRoleChange(user.userId, 'remove')}>
                      직위 박탈
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        {selectedButton === 'button2' && (
            <CompanyProfile companyName="크로이스" />
          )}
          {selectedButton === 'button3' && (
            // 버튼 3을 눌렀을 때 보여줄 내용
            <div>버튼 3을 눌렀을 때 보여줄 내용</div>
          )}
        </div>
      </div>
    </div>
  ); 
}

export default MasterProfile;
