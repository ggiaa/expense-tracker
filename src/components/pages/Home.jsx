import { Box, Typography } from "@mui/material";
import React from "react";
import Balance from "../homePageComponents/Balance";

function Home() {
  return (
    <>
      <Box
        sx={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
          rowGap: 3,
        }}
      >
        <Balance />
        {/* <RecentTransactions /> */}
      </Box>
      <Box sx={{ width: "75%" }}>{/* <Accounts /> */}</Box>
    </>
  );
}

export default Home;
