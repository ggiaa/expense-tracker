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
import AddTransaction from "../homePageComponents/AddTransaction";

function BottomNavbar() {
  const [value, setValue] = useState(0);
  const [transactionOpen, setTransactionOpen] = useState(false);

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
                onClick={() => setTransactionOpen(true)}
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

      {/* MODAL ADD TRANSACTION */}
      <AddTransaction
        transactionOpen={transactionOpen}
        setTransactionOpen={setTransactionOpen}
      />
    </Box>
  );
}

export default BottomNavbar;
