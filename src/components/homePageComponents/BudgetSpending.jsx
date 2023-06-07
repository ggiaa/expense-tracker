import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

function BudgetSpending() {
  return (
    <Box sx={{ height: "100%" }}>
      <Card sx={{ height: "95%" }}>
        <CardContent>
          <Typography>Budget Spending</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default BudgetSpending;
