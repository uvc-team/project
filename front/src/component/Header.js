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

function Header() {
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
          <Tabs>
            <Tab
              label="Home"
              icon={<HomeIcon />}
              component={Link}
              to="/homepage"
            />
            <Tab
              label="DashBoard"
              icon={<Airplay />}
              component={Link}
              to="/webgl"
            />
            <Tab
              label="Profile"
              icon={<AccountCircleIcon />}
              component={Link}
              to="/profile"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
