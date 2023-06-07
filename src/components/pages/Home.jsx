import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Balance from "../homePageComponents/Balance";
import RecentTransactions from "../homePageComponents/RecentTransactions";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../features/accounts/accountsSlice";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import Accounts from "../homePageComponents/Accounts";
import Forecasting from "../homePageComponents/Forecasting";
import BudgetSpending from "../homePageComponents/BudgetSpending";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          rowGap: 2,
        }}
      >
        <Accounts />
        {/* <Box sx={{ height: "100%" }}> */}
        <Grid container spacing={1} sx={{ height: "100%" }}>
          <Grid item xs={9}>
            <Forecasting />
          </Grid>
          <Grid item xs={3}>
            <BudgetSpending />
          </Grid>
        </Grid>
        {/* </Box> */}
      </Box>
    </>
  );
}

export default Home;
