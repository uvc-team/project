import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Header/header";
import "../../css/profile.css";

function MasterProfile() {
  const [numValue, setNumValue] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/position/presidentPage`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        // console.log(response); // 전체 응답 출력
        const usersData = response.data.user;
        console.log(usersData);
        // const newRole

        setUsers(usersData); // 사용자 데이터 상태 업데이트
      })
      .catch((error) => console.error("Error:", error));
  }, []);

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
        console.log(response.data); // 성공적으로 직급 변경된 응답 출력

        // 필요한 경우 새로운 상태 업데이트 등 추가 작업 수행
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="proFileBackground">
      <Header numValue={numValue} setNumValue={setNumValue} />

      <div className="profileBox">
        <div className="userProfile">
          <h2>안녕하세요 OO님</h2>
          <div className="userImg" />
          <div className="userTextBox">
            {" "}
            {/* 수정된 부분 */}
            {/* 사용자 정보 표시 */}
            {users.map((user) => (
              <div key={user.userId}>
                <p>
                  {user.name},({user.Position.role})
                </p>
                {/* ... */}
                {/* 직급 변경 버튼 */}
                <button
                  onClick={() => handleRoleChange(user.userId, "manager")}
                >
                  {" "}
                  {/* 수정된 부분 */}
                  매니저 등록
                </button>
                <button onClick={() => handleRoleChange(user.userId, "remove")}>
                  {" "}
                  {/* 수정된 부분 */}
                  직위 박탈
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterProfile;
