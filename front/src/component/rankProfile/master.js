import React, { useState, useEffect } from "react";
import axios from "axios";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import FullCalendar from "@fullcalendar/react"
// import "./calendar.css";
// import { koLocale } from "@fullcalendar/core/locales/ko";
import CompanyProfile from "./companyProfile";
import "../../css/profile.css";

import Button from "@mui/material/Button";

function MasterProfile() {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    const title = prompt("일정의 제목을 입력하세요:");
    if (title) {
      setEvents([...events, { title: title, date: info.dateStr }]);

      // POST 요청 보내기
      axios
        .post(
          `${process.env.REACT_APP_URL}/calendar/events`,
          {
            title: title,
            date: info.dateStr,
          },
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          // 성공적으로 요청이 완료되었을 때 추가 작업 수행 가능
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  useEffect(() => {
    // 서버에서 일정 데이터 가져오기
    axios
      .get(`${process.env.REACT_APP_URL}/calendar/events`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const eventData = response.data.events;
        setEvents(eventData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const [numValue, setNumValue] = useState(0);

  const [users, setUsers] = useState([]);
  const [selectedButton, setSelectedButton] = useState("button1");

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
      <div className="profileBox">
        <div className="userProfile">
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%" }}
            onClick={() => handleButtonClick("button1")}
          >
            직위변경
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
            onClick={() => handleButtonClick("button2")}
          >
            협력업체
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
            onClick={() => handleButtonClick("button3")}
          >
            일정달력
          </Button>
        </div>
        <div className="remainingSpace">
          {selectedButton === "button1" && (
            <div>
              {users.map((user) => (
                <div key={user.userId} className="userInfo">
                  <p>
                    {user.name}, ({user.Position.role})
                  </p>
                  <div className="buttonContainer">
                    <button
                      onClick={() => handleRoleChange(user.userId, "manager")}
                    >
                      매니저 등록
                    </button>
                    <button
                      onClick={() => handleRoleChange(user.userId, "remove")}
                    >
                      직위 박탈
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedButton === "button2" && <CompanyProfile />}
          {/* {selectedButton === "button3" && (
            <div style={{ width: "120%", maxWidth: "800px", margin: "0 auto" }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="ko"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridDay",
                }}
                editable={true}
                selectable={true}
                height={"60vh"}
                dateClick={handleDateClick}
                events={events} // 서버에서 받은 일정 데이터를 전달합니다.
              /> */}
          {/* </div> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default MasterProfile;
