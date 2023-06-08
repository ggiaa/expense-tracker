import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { green } from "@mui/material/colors";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import LoadingAccounts from "../loadingComponent/LoadingAccounts";

function Accounts() {
  const accounts = useSelector((state) => state.accounts);
  const pinnedAccounts = accounts.accounts
    .filter((account) => account.pinned)
    .sort((a, b) => a.pinned_order - b.pinned_order);

  return (
    <Box>
      {accounts.isLoading ? (
        <LoadingAccounts />
      ) : (
        <>
          <Typography fontWeight={600} mb={1} fontSize={15}>
            Accounts
          </Typography>
          <Grid container spacing={3}>
            {pinnedAccounts.map((account) => (
              <Grid item xs={3} key={account.pinned_order}>
                <Card
                  sx={{
                    bgcolor: green[500],
                    color: "white",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: 2,
                    }}
                  >
                    <Grid container columnGap={2}>
                      <Grid item xs={3}>
                        <Box
                          sx={{
                            bgcolor: green[700],
                            borderRadius: 99,
                            width: "100%",
                            aspectRatio: 1 / 1,
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <AccountBalanceWalletOutlinedIcon fontSize="large" />
                        </Box>
                      </Grid>
                      <Grid item xs={7}>
                        <Box
                          sx={{
                            height: "100%",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Box>
                            <Typography fontWeight={600} fontSize={14}>
                              {account.account_name}
                            </Typography>
                            <Typography fontSize={14}>
                              <NumericFormat
                                value={account.amount}
                                displayType={"text"}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix={"Rp"}
                              />
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Accounts;
