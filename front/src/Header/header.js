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
import { Link, useNavigate, useLocation } from "react-router-dom";
import Notice from "../component/notice";

  // 페이지 로딩시 로컬스토리지에서 토큰 가져와 사용자 인증 상태를 확인
  function Header({ numValue, setNumValue }) {
    const [token, setToken] = useState("");
    const navigate = useNavigate(); // useNavigate 초기화

    // 페이지 로딩시 로컬스토리지에서 토큰 가져와 사용자 인증 상태를 확인
    const location = useLocation();
    const id = location.state;
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);
  
    const changeNumber = (event, newValue) => {
      setNumValue(newValue);
    };
  
    const handleAccountClick = () => {
      if (!token) {
        // 토큰이 없을 때 로그인 페이지로 이동
        navigate("/loginPage");
      } else {
        // 토큰이 있을 때 프로필 페이지로 이동
        navigate("/profile");
        
      }
    };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", boxShadow: "none"}}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, display:'flex',justifyContent: 'center' }}>
          <Tab
              icon={<Notice sx={{fontSize:'100%'}} />}
              to = {'/notice'}
              sx={{ color: "white", width:'100%'}}
              component={Link}
            />
          </Typography>
          <Tab
              label="홈"
              icon={<HomeIcon />}
              component={Link}
              to="/"
              sx={{ color: "white" }}
            />
          <Tabs value={numValue} onChange={changeNumber}>
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
              onClick={handleAccountClick}
              sx={{ color: "white" }}
            />
            
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
