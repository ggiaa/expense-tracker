import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Balance from "../homePageComponents/Balance";
import RecentTransactions from "../homePageComponents/RecentTransactions";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../features/accounts/accountsSlice";
import { fetchTransactions } from "../../features/transactions/transactionSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactions());
  }, [dispatch]);
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
        <RecentTransactions />
      </Box>
      <Box sx={{ width: "75%" }}>{/* <Accounts /> */}</Box>
    </>
  );
}

export default Home;
