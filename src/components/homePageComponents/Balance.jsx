import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import { green, red } from "@mui/material/colors";
import { useSelector } from "react-redux";

function Balance() {
  const accounts = useSelector((state) => state.accounts);

  return (
    <Stack rowGap={1}>
      <Card>
        <CardContent sx={{ textAlign: "center" }}>
          {accounts.isLoading ? (
            <>
              <Typography>
                <Skeleton />
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 17 }}>
                <Skeleton />
              </Typography>
            </>
          ) : (
            <>
              <Typography>Balance</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 17 }}>
                <NumericFormat
                  value={accounts.accounts.reduce(
                    (total, number) => (total += Number(number.amount)),
                    0
                  )}
                  displayType={"text"}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={"Rp"}
                />
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "calc(99%/2)",
              wordBreak: "break-all",
              display: "flex",
            }}
          >
            <SouthIcon
              fontSize="medium"
              sx={{ height: "100%", color: green[500] }}
            />

            <Box paddingX={1}>
              <Typography fontSize={14}>Income</Typography>
              <Typography fontWeight={600} color="#0FAE1E" fontSize={15}>
                Rp1.500.400
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ color: "black" }} />
          <Box
            sx={{
              width: "calc(99%/2)",
              wordBreak: "break-all",
              display: "flex",
            }}
          >
            <NorthIcon
              fontSize="medium"
              sx={{
                height: "100%",
                color: red[500],
                paddingLeft: 1,
              }}
            />
            <Box paddingLeft={1}>
              <Typography fontSize={14}>Expenses</Typography>
              <Typography fontWeight={600} color="red" fontSize={15}>
                Rp.1.500.400
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default Balance;
