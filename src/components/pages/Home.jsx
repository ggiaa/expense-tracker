import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Balance from "../homePageComponents/Balance";
import RecentTransactions from "../homePageComponents/RecentTransactions";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../features/accounts/accountsSlice";
import {
  fetchMasterTransaction,
  fetchTransactions,
} from "../../features/transactions/transactionSlice";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import Accounts from "../homePageComponents/Accounts";
import Forecasting from "../homePageComponents/Forecasting";
import BudgetSpending from "../homePageComponents/BudgetSpending";
import SavingPlans from "../homePageComponents/SavingPlans";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
    // dispatch(fetchMasterTransaction());
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        columnGap: 1.5,
        height: "98%",
      }}
    >
      <Box
        sx={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}
      >
        <Balance />
        <RecentTransactions />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "55%",
          rowGap: 2,
        }}
      >
        <Accounts />
        <Forecasting />
      </Box>
      <Box
        sx={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
        }}
      >
        <SavingPlans />
        <BudgetSpending />
      </Box>
    </Box>
  );
}

export default Home;
