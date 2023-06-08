import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  circularProgressClasses,
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";
import { NumericFormat } from "react-number-format";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: purple[400],
    color: "white",
    borderRadius: 15,
    fontSize: theme.typography.pxToRem(13),
    border: "1px solid #dadde9",
  },
}));

function SavingPlans() {
  return (
    <Box sx={{ height: "100%" }}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography mb={2}>Savings</Typography>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={14}>Macbook 12 Pro</Typography>
                <Typography fontSize={14}>76%</Typography>
              </Box>
              <HtmlTooltip
                placement="top"
                title={
                  <>
                    <NumericFormat
                      value="2000000"
                      displayType={"text"}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix={"Rp"}
                    />{" "}
                    /{" "}
                    <NumericFormat
                      value="1500000"
                      displayType={"text"}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix={"Rp"}
                    />
                  </>
                }
              >
                <BorderLinearProgress variant="determinate" value={76} />
              </HtmlTooltip>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={14}>Macbook 12 Pro</Typography>
                <Typography fontSize={14}>76%</Typography>
              </Box>
              <BorderLinearProgress variant="determinate" value={76} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={14}>Macbook 12 Pro</Typography>
                <Typography fontSize={14}>76%</Typography>
              </Box>
              <BorderLinearProgress variant="determinate" value={76} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={14}>Macbook 12 Pro</Typography>
                <Typography fontSize={14}>76%</Typography>
              </Box>
              <BorderLinearProgress variant="determinate" value={76} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SavingPlans;
