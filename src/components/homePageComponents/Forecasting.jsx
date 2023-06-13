import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import EChartsReact from "echarts-for-react";
import { useSelector } from "react-redux/es/exports";
import moment from "moment";

function Forecasting() {
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [income, setIncome] = useState({
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  });
  const [expenses, setExpenses] = useState({
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  });

  const forecastingAll = useSelector((data) => data.transactions);
  const forecasting = forecastingAll;
  console.log(forecasting);

  const firstDateOfCurrentWeek = moment().startOf("week").date();
  // console.log(firstDateOfCurrentWeek.date());
  const lastDateOfCurrentWeek = moment().endOf("week");

  // console.log(income);
  // const setIncomeExpense = () => {
  //   // setIncome({
  //   //   Sun: 0,
  //   //   Mon: 0,
  //   //   Tue: 0,
  //   //   Wed: 0,
  //   //   Thu: 0,
  //   //   Fri: 0,
  //   //   Sat: 0,
  //   // });
  //   // setExpenses({
  //   //   Sun: 0,
  //   //   Mon: 0,
  //   //   Tue: 0,
  //   //   Wed: 0,
  //   //   Thu: 0,
  //   //   Fri: 0,
  //   //   Sat: 0,
  //   // });

  //   forecastingAll?.currentWeekTransaction.map((transaction) => {
  //     const transactionDate = new Date(transaction.date.seconds * 1000);
  //     if (
  //       transaction.is_income &&
  //       transactionDate >= firstDateOfCurrentWeek &&
  //       transactionDate <= lastDateOfCurrentWeek
  //     ) {
  //       const dayName = day[transactionDate.getDay()];
  //       setIncome({
  //         ...income,
  //         [dayName]: (income[dayName] += parseInt(transaction.amount)),
  //       });
  //     }

  //     if (
  //       transaction.is_expense &&
  //       transactionDate >= firstDateOfCurrentWeek &&
  //       transactionDate <= lastDateOfCurrentWeek
  //     ) {
  //       const dayName = day[transactionDate.getDay()];
  //       setExpenses({
  //         ...expenses,
  //         [dayName]: (expenses[dayName] += parseInt(transaction.amount)),
  //       });
  //     }
  //   });

  //   console.log(expenses);
  //   // setExpenses({
  //   //   ...expenses,
  //   //   Sun: 0,
  //   //   Mon: 0,
  //   //   Tue: 0,
  //   //   Wed: 0,
  //   //   Thu: 0,
  //   //   Fri: 0,
  //   //   Sat: 0,
  //   // });
  //   // console.log(["income"].concat(Object.values(income)));
  //   // console.log(expenses);
  //   // forecasting.map((trans) => {
  //   //   console.log("masuk");
  //   //   const transactionDate = new Date(trans.date.seconds * 1000);
  //   //   if (
  //   //     trans.is_income &&
  //   //     transactionDate >= firstDateOfCurrentWeek &&
  //   //     transactionDate <= lastDateOfCurrentWeek
  //   //   ) {
  //   //     const dayIndex = day[transactionDate.getDay()];
  //   //     console.log(dayIndex);
  //   //     setIncome({
  //   //       ...income,
  //   //       dayIndex: (income[dayIndex] += parseInt(trans.amount)),
  //   //     });
  //   //   }
  //   //   // if (
  //   //   //   trans.is_expense &&
  //   //   //   transactionDate >= firstDateOfCurrentWeek &&
  //   //   //   transactionDate <= lastDateOfCurrentWeek
  //   //   // ) {
  //   //   //   const dayIndex = day[transactionDate.getDay()];
  //   //   //   setExpenses({
  //   //   //     ...expenses,
  //   //   //     dayIndex: (expenses[dayIndex] += parseInt(trans.amount)),
  //   //   //   });
  //   //   // }
  //   // });
  // };

  useEffect(() => {
    // setIncomeExpense();
  }, [forecastingAll]);

  const option = {
    tooltip: {},
    color: ["#4cabce", "#e5323e"],
    dataset: {
      source: [
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ["Income"].concat(Object.values(income)),
        ["Expense"].concat(Object.values(expenses)),
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
