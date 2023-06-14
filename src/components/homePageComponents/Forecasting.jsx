import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import EChartsReact from "echarts-for-react";
import { useSelector } from "react-redux/es/exports";
import moment from "moment";

function Forecasting() {
  const [currentWeekDate, setcurrentWeekDate] = useState([]);
  const [income, setIncome] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [expenses, setExpenses] = useState([0, 0, 0, 0, 0, 0, 0]);

  const forecastingAll = useSelector((data) => data.transactions);
  const forecasting = forecastingAll.currentWeekMasterTransactions;

  const firstDateOfCurrentWeek = moment().startOf("week").date();

  useEffect(() => {
    const setIncomeExpense = () => {
      const num = firstDateOfCurrentWeek;
      setcurrentWeekDate([
        num,
        num + 1,
        num + 2,
        num + 3,
        num + 4,
        num + 5,
        num + 6,
      ]);

      forecasting.map((data) => {
        const masterTransactionDate = moment()
          .toDate(data.created_at)
          .getDate();
        const indexInState = currentWeekDate.indexOf(
          parseInt(masterTransactionDate)
        );

        const newIncome = income.map((c, i) => {
          return i == indexInState ? data.income : c;
        });

        const newExpense = expenses.map((c, i) => {
          return i == indexInState ? data.expense : c;
        });

        setIncome(newIncome);
        setExpenses(newExpense);
      });
    };

    setIncomeExpense();
  }, [forecastingAll]);

  const option = {
    tooltip: {},
    color: ["#4cabce", "#e5323e"],
    dataset: {
      source: [
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ["Income"].concat(income),
        ["Expense"].concat(expenses),
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
          itemStyle: {
            // color: "green",
          },
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
        <Box>
          <Typography>Forecasting</Typography>
        </Box>
        <EChartsReact style={{ height: "90%" }} option={option} />
      </CardContent>
    </Card>
  );
}

export default Forecasting;
