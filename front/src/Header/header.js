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
import { useState } from "react";

function Header() {
  const [numValue, setNumValue] = useState(0);

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
          <Tabs onChange={changeNumber} value={numValue}>
            <Tab
              label="홈"
              icon={<HomeIcon />}
              component={Link}
              to="/"
              sx={{ color: "white" }}
              value={0}
            />
            <Tab
              label="대시보드"
              icon={<Airplay />}
              component={Link}
              to="/dash"
              sx={{ color: "white" }}
              value={1}
            />
            <Tab
              label="계정"
              icon={<AccountCircleIcon />}
              component={Link}
              to="/profile"
              sx={{ color: "white" }}
              value={2}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
