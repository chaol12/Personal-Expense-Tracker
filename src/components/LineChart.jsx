//import { useProtectedRoute } from "../components/useProtectedRoute";
import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";
import { getTransactionFromDB, getBudget } from '../utils/firebase-config';
import { useState, useEffect } from "react";
//planned budget vs total spending accumulated by each date 
// The frontend was taken from the template code and text was adjusted to match our application, and I confirmed with the professor
// to ensure the use of template code was okay: https://flowbite.com/docs/plugins/charts/
 window.addEventListener("load", function () { });
const LineChart = () => {
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

  //reverse so the dates are in chronological order
  const revTrans = transactionList.slice().reverse();
  const dates = revTrans.map(transaction => {
    const dateObj = new Date(transaction.date);
    dateObj.setDate(dateObj.getDate()); // Adding one day to adjust

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  });


  const amount = transactionList.map(transaction => {
    //console.log(transaction)
    return transaction.amount;
  });

  //to return monthly Budget --> single value! 
  const [monthlyBudget, setMonthlyBudget] = useState('')
  useEffect(() => { getMonthlyBudget() }, [currentUser])
  async function getMonthlyBudget() {
    if (currentUser) {
      const data = await getBudget(currentUser.uid);
      setMonthlyBudget(data);
    }
  }
  //map over the transactions and place the monthly budget 
  const budget = revTrans.map(() => {
    return monthlyBudget;
  });

  // show amount and date 
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
     accumulator.push(parseInt((previousTotal + amount)));
      //accumulator.push((previousTotal + amount));
      return accumulator;
    },
    []
  );
  //find last accumualtion = total spending
  const keys = Object.keys(accumulatedWithPrevious);
  const lastKey = keys[keys.length - 1];
  const lastValue = (parseFloat(accumulatedWithPrevious[lastKey]).toFixed(2));

  const YourComponent = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
      setIsDropdownOpen(false);
    }
  };
  const options = {
    chart: {
      height: "100%",
      width: "100%",
      type: "line",
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
      curve: 'smooth'
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -26
      },
    },
    series: [
      {
        name: "Total Spent up to Date",
        data: accumulatedWithPrevious,
        color: "#D3F6DB",
      },
      {
        name: "Monthly Budget",
        //data: [400,400,400,400,400],
        data: budget,
        color: "#182825",
      },
      {
        name: "Actual Spent on Date",
        data: amount,
        color: "#D6EBFF",
      },
    ],
    legend: {
      show: true
    },
    xaxis: {
      categories: dates,
      // categories:[1,2,3,4,5,6,7],
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssclassName: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
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

  if (document.getElementById("line-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("line-chart"), options);
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
    <div className="max-w-max w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-1">
        <div className="grid gap-4 grid-cols-2 mb-6">
          <div>
            <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">Planned Budget
              <svg data-popover-target="clicks-info" data-popover-placement="bottom" className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div data-popover id="clicks-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Budget Spent growth - Incremental</h3>
                  <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                  <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                  <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg></a>
                </div>
                <div data-popper-arrow></div>
              </div>
            </h5>
            <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">${monthlyBudget}</p>
          </div>
          <div>
            <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">Total Spent
              <svg data-popover-target="cpc-info" data-popover-placement="bottom" className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div data-popover id="cpc-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Budget Savings growth - Incremental</h3>
                  <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                  <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                  <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg></a>
                </div>
                <div data-popper-arrow></div>
              </div>
            </h5>
            <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">${lastValue}</p>
          </div>
        </div>
        <div>
          {/* <button id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom" type="button" className="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Last week <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg></button> */}
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
        </div>
      </div>
      <div id="line-chart"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
        <div className="pt-5">
        <button
            onClick={() => navigate("/TransTable")}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-300 ease-in-out"
            style={{ backgroundColor: colors.green, color: colors.mint }}
          >
            View Full Report
          </button>


        </div>
      </div>
    </div>
  )
}
export default LineChart