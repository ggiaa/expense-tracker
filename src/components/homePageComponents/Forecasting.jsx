import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import EChartsReact from "echarts-for-react";

function Forecasting() {
  const option = {
    tooltip: {},
    color: ["#4cabce", "#e5323e"],
    dataset: {
      source: [
        ["type", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ["Income", 100000, 50000, 46000, 10000, 22000, 0, 0],
        ["Expense", 40000, 67000, 13000, 98000, 30000, 0, 0],
      ],
    },
    legend: {},
    xAxis: {
      type: "category",
      axisTick: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        seriesLayoutBy: "row",
        emphasis: {
          // itemStyle: {
          //   color:'auto'
          // }
        },
      },
      {
        type: "bar",
        seriesLayoutBy: "row",
      },
    ],
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography>Forecasting</Typography>
        <EChartsReact style={{ height: "90%" }} option={option} />
      </CardContent>
    </Card>
  );
}

export default Forecasting;
