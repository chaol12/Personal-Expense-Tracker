import { useProtectedRoute } from "../components/useProtectedRoute";
import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";
import { getTransactionFromDB, getBudget, getSavingGoal } from '../utils/firebase-config';
import { useState, useEffect } from "react";
// The frontend was taken from the template code and text was adjusted to match our application, and I confirmed with the professor
// to ensure the use of template code was okay: https://flowbite.com/docs/plugins/charts/
window.addEventListener("load", function () { });
const AreaChart = () => {
  //useProtectedRoute();
  const { currentUser } = useAuth();

  useEffect(() => { fetchTransactions() }, [currentUser])
  async function fetchTransactions() {
    if (currentUser) {
      const data = await getTransactionFromDB(currentUser.uid);
      setTransactionList(data);
    }
  }
  const [transactionList, setTransactionList] = useState([]);
  const navigate = useNavigate();


  //   //monthly Budget
  const [monthlyBudget, setMonthlyBudget] = useState('')
  useEffect(() => { getMonthlyBudget() }, [currentUser])
  async function getMonthlyBudget() {
    if (currentUser) {
      const data = await getBudget(currentUser.uid);
      setMonthlyBudget(data);
    }
  }
  const revTrans = transactionList.slice().reverse();
  // Assuming transactionList contains objects with a 'date' property as strings in a certain format
  const dates = revTrans.map(transaction => {
    // Convert the date string to a JavaScript Date object

    return new Date(transaction.date);
  });

  const amount = transactionList.map(transaction => {
    // Convert the date string to a JavaScript Date object
    console.log(transaction)
    return transaction.amount;
  });

  const accumulatedByDate = transactionList.reduce((accumulator, transaction) => {
    const { date, amount } = transaction;
    // If the date doesn't exist in accumulator, create it and initialize with 0
    accumulator[date] = (accumulator[date] || 0) + amount;
    return accumulator;
  }, {});

  // Calculate accumulated amounts considering previous dates
  const accumulatedWithPrevious = Object.entries(accumulatedByDate).reduce(
    (accumulator, [date, amount]) => {
      const previousTotal = accumulator.length > 0 ? accumulator[accumulator.length - 1] : 0;
      //accumulator.push(parseFloat(previousTotal + amount).toFixed(2));
      accumulator.push(previousTotal + amount);
      return accumulator;
    },
    []
  );
  const keys = Object.keys(accumulatedWithPrevious);
  const lastKey = keys[keys.length - 1];
  const lastValue = accumulatedWithPrevious[lastKey];

  //amount saved = monthlyBudget-amountSpent
  const amountSaved = Object.entries(accumulatedWithPrevious).reduce(
    (accumulator, [date, amount]) => {
      accumulator.push(parseInt(monthlyBudget - amount));
      return accumulator;
    },
    []
  );

  const savingsKeys = Object.keys(amountSaved);
  const lastSavingsKey = savingsKeys[savingsKeys.length - 1];
  //const lastSavingsValue = amountSaved[lastSavingsKey];
  const lastSavingsValue =(parseFloat(amountSaved[lastSavingsKey]).toFixed(2));

  //savings goal
  const [savingGoal, setSavingGoal] = useState('')
  useEffect(() => { getSaving() }, [currentUser])

  async function getSaving() {
    if (currentUser) {
      const data = await getSavingGoal(currentUser.uid);
      setSavingGoal(data)
    }
  }
  //calculate percentage towards savings goal vs current saved
  const percentageSaved = (((lastSavingsValue - savingGoal) / savingGoal) * 100).toFixed(2);
  //const percentageSaved= savingGoal;

  console.log(amountSaved);
  
  const options = {
    chart: {
      height: "100%",
      width: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#182825",
        gradientToColors: ["#D6EBFF"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0
      },
    },
    series: [
      {
        name: "Amount in Budget Savings",
        //data: [6500, 6418, 6456, 6526, 6356, 6456],
        data: amountSaved,
        color: "#D6EBFF",
      },
    ],
    xaxis: {
      // categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
      categories: dates,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  }

  if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("area-chart"), options);
    chart.render();
  }
  const colors = {
    paleGreen: "#D3F6DB",
    green: "#5B8260",
    darkGreen: "#182825",
    navy: "#1F2937",
    lightBlue: "#D6EBFF"
  };
  return (
    // The frontend was taken from the template code and text was adjusted to match our application, and I confirmed with the professor
    // to ensure the use of template code was okay: https://flowbite.com/docs/plugins/charts/
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div className="grid gap-4 grid-cols-2">
          <div>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Current Savings</p>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">${lastSavingsValue}</h5>
            {/* <p className="text-base font-normal text-gray-500 dark:text-gray-400">Amount Saved</p> */}
          </div>

          <div className="ml-2">
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Savings Goal</p>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">${savingGoal}</h5>
            {/* <p className="text-base font-normal text-gray-500 dark:text-gray-400">Savings Goal</p> */}
          </div>

          <div
            className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            {percentageSaved}%
            {percentageSaved > 0 ? (
                      <svg
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13V1m0 0L1 5m4-4 4 4"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 1v12m0 0l-4-4m4 4 4-4"
                        />
                      </svg>
                    )}

          </div>
        </div>
      </div>
      <div id="area-chart"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
              </li>
            </ul>
          </div>

          {/* <button
            onClick={() => navigate("/TransTable")}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-300 ease-in-out"
            style={{ backgroundColor: colors.green, color: colors.mint }}
          >
            View Full Report
          </button> */}
        </div>
      </div>
    </div>
  )
  //})}
}



export default AreaChart