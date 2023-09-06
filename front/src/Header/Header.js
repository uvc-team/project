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
      <AppBar position="fixed" className="app-bar" sx={{ background: '#fff' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} className="logo">
          </Typography>
          <Tabs className="tabs">
            <Tab
              label="Home"
              icon={<HomeIcon className="tab-icon" />}
              component={Link}
              to="/homepage"
              className="tab"
            />
            <Tab
              label="Dashboard"
              icon={<Airplay className="tab-icon" />}
              component={Link}
              to="/webgl"
              className="tab"
            />
            <Tab
              label="Profile"
              icon={<AccountCircleIcon className="tab-icon" />}
              component={Link}
              to="/profile"
              className="tab"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
