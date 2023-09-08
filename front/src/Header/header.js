// Header 컴포넌트
import React from "react";
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
import { Link } from "react-router-dom";

function Header({ numValue, setNumValue , openModal}) {
  const changeNumber = (event, newValue) => {
    setNumValue(newValue);
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
              component ={Link}
              to = '/loginPage'
              sx={{ color: "white" }}       
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
