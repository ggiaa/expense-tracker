import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Skeleton,
  SvgIcon,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/system";
import React from "react";
import { blue, green, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import LoadingRecentTransactions from "../loadingComponent/LoadingRecentTransactions";

function RecentTransactions() {
  const transactions = useSelector((state) => state.transactions);
  const recentTransactions = transactions.recentTransaction;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          height: "100%",
        }}
      >
        <CardContent>
          {transactions.isLoading ? (
            <LoadingRecentTransactions />
          ) : (
            <>
              <Typography mb={2}>Recent Transactions</Typography>
              {recentTransactions.map((transaction, index) => (
                <Box key={index}>
                  <Grid container mt={1}>
                    <Grid item xs={2}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          bgcolor: blue[800],
                          borderRadius: 99,
                          height: "80%",
                          aspectRatio: 1 / 1,
                          textAlign: "center",
                          opacity: "75%",
                        }}
                      >
                        <HomeIcon
                          sx={{
                            color: "white",
                            marginX: "auto",
                            marginY: "auto",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">
                        {transaction.sub_category
                          ? transaction.category +
                            " > " +
                            transaction.sub_category
                          : transaction.is_income
                          ? "Income > " + transaction.category
                          : "Expense > " + transaction.category}
                      </Typography>
                      <Typography variant="caption">
                        {transaction.note}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography
                        variant="subtitle2"
                        color={transaction.is_income ? green[800] : red[600]}
                      >
                        <NumericFormat
                          value={transaction.amount}
                          displayType={"text"}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix={"Rp"}
                        />
                      </Typography>
                      <Typography variant="caption">
                        {moment(transaction.date.toDate()).calendar(null, {
                          sameDay: "[Today]",
                          nextDay: "[Tomorrow]",
                          nextWeek: "dddd",
                          lastDay: "[Yesterday]",
                          lastWeek: "D MMM (ddd)",
                          sameElse: "D MMM (ddd)",
                        })}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default RecentTransactions;
