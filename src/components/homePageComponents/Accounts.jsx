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
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", width: "100%" }}>
              {pinnedAccounts.map((account) => (
                <Card
                  key={account.pinned_order}
                  sx={{
                    bgcolor: green[500],
                    color: "white",
                    width: "calc(100%/4)",
                    marginRight: 2,
                  }}
                >
                  <CardContent
                    sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
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
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Accounts;
