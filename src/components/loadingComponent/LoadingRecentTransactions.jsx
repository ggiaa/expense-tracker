import {
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
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

function LoadingRecentTransactions() {
  return (
    <>
      <Typography mb={2}>
        <Skeleton />
      </Typography>
      {[1, 2, 3, 4, 5, 6].map((transaction) => (
        <>
          <Grid container mt={1}>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "90%",
                  textAlign: "center",
                }}
              >
                <Skeleton
                  variant="circular"
                  sx={{
                    height: "100%",
                    aspectRatio: 1 / 1,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="subtitle2">
                <Skeleton />
              </Typography>
              <Typography variant="caption">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4} textAlign="right">
              <Typography variant="subtitle2">
                <Skeleton />
              </Typography>
              <Typography variant="caption">
                <Skeleton />
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </>
      ))}
    </>
  );
}

export default LoadingRecentTransactions;
