import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  CssBaseline,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Airplay from "@mui/icons-material/Airplay";
import { Link, useNavigate } from "react-router-dom";

function Header({ numValue, setNumValue }) {
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // useNavigate 초기화

  // 페이지 로딩시 로컬스토리지에서 토큰 가져와 사용자 인증 상태를 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const changeNumber = (event, newValue) => {
    setNumValue(newValue);
  };

  const handleAccountClick = () => {
    if (token) {
      // 토큰이 있는 경우 계정 아이콘을 클릭하면 프로필 페이지로 이동
      navigate("/profile");
    } else {
      // 토큰이 없는 경우 계정 아이콘을 클릭하면 로그인 페이지로 이동
      navigate("/loginPage");
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
          <Tabs value={numValue} onChange={changeNumber}>
            <Tab
              label="홈"
              icon={<HomeIcon />}
              component={Link}
              to="/"
              sx={{ color: "white" }}
            />
            <Tab
              label="대시보드"
              icon={<Airplay />}
              component={Link}
              to="/dash"
              sx={{ color: "white" }}
            />
            <Tab
              label="계정"
              icon={<AccountCircleIcon />}
              onClick={handleAccountClick} // 계정 아이콘 클릭 핸들러 추가
              sx={{ color: "white" }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
