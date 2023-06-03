import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  ListItemIcon,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AddIcon from "@mui/icons-material/Add";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import { blue, green, red } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Outlet, Link } from "react-router-dom";

function BottomNavbar() {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box textAlign="center" width="calc(100%/3)" sx={{ marginX: "auto" }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ borderRadius: 8, boxShadow: 10 }}
      >
        <BottomNavigationAction
          component={Link}
          to={"/"}
          label="Home"
          icon={<HomeOutlinedIcon />}
        ></BottomNavigationAction>

        <BottomNavigationAction
          component={Link}
          to={"/statistic"}
          label="Statistic"
          icon={<BarChartOutlinedIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          icon={
            <Box sx={{ height: "80%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: blue[800],
                  borderRadius: 99,
                  height: "100%",
                  aspectRatio: 1 / 1,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                <AddIcon
                  fontSize="large"
                  sx={{ color: "white", marginX: "auto" }}
                />
              </Box>
            </Box>
          }
        />

        <BottomNavigationAction
          label="Settings"
          icon={<SettingsOutlinedIcon />}
        />
      </BottomNavigation>

      {/* Add menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem sx={{ color: red[800] }}>
          <ListItemIcon>
            <NorthIcon sx={{ color: red[800] }} fontSize="small" />
          </ListItemIcon>
          Expenses
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: green[800] }}>
          <ListItemIcon>
            <SouthIcon sx={{ color: green[800] }} fontSize="small" />
          </ListItemIcon>
          Income
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default BottomNavbar;
