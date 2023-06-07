import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Balance from "../homePageComponents/Balance";
import RecentTransactions from "../homePageComponents/RecentTransactions";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../features/accounts/accountsSlice";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import Accounts from "../homePageComponents/Accounts";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <Box
        sx={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
        }}
      >
        <Balance />
        <RecentTransactions />
      </Box>
      <Box sx={{ width: "75%" }}>
        <Accounts />
      </Box>
    </>
  );
}

export default Home;
