//import { useProtectedRoute } from "../components/useProtectedRoute";
import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";
import {getTransactionFromDB } from '../utils/firebase-config';
import { useState,useEffect } from "react";
// The frontend was taken from the template code and text was adjusted to match our application, and I confirmed with the professor
// to ensure the use of template code was okay: https://flowbite.com/docs/plugins/charts/
window.addEventListener("load", function() {});

const PieChart = () => {
  //useProtectedRoute();
  const { currentUser} = useAuth();

  useEffect(() => {fetchTransactions()},[currentUser])
  async function fetchTransactions() {
    if(currentUser){
      const data = await getTransactionFromDB(currentUser.uid);
      setTransactionList(data);
    }
  }
  const [transactionList, setTransactionList] = useState([]);
  const navigate = useNavigate();
//finding totals from each description
  const categoryTotals = transactionList.reduce((totals, transaction) => {
    const { description, amount } = transaction;
    totals[description] = (totals[description] || 0) + amount;
    return totals;
  }, {});
  
  // Step 2: Calculate the total sum of all categories
  const totalSum = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
  
  // Step 3: Calculate percentages for each category
  const categoryPercentages = Object.keys(categoryTotals).map(description => {
    const percentage = (categoryTotals[description] / totalSum) * 100;
    return { description, percentage };
  });
  
  // Step 4: Sort categories based on percentages
  categoryPercentages.sort((a, b) => b.percentage - a.percentage);
  
  // Step 5: Get the top 4 categories by percentage
  const top4Categories = categoryPercentages.slice(0, 4);

  const top4CategoryStrings = top4Categories.map((description, index) => {
    return `${index + 1}: ${description.percentage.toFixed(2)}`;
  });
  const numbers = top4CategoryStrings.map((str) => {
    // Split each string by ':' and take the second part, then convert it to a floating-point number
    return parseFloat(str.split(': ')[1]);
  });
//displaying top4 categories 
  const top4Category = top4Categories.map((description, index) => {
    return `${index + 1}: ${description.description} `;
  });

  const getChartOptions = () => {
    return {
      series: numbers,
      colors: ["#D3F6DB","#5B8260", "#1F2937", "#D6EBFF"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      labels: top4Category,
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "%"
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value  + "%"
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    }
  }

  if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
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
        <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between items-start w-full">
                <div className="flex-col items-center">
                    <div className="flex items-center mb-1">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mr-1">Top 4 Category Breakdown</h5>
                        
                        <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                            <div className="p-3 space-y-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
                                <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                                <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                                <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg></a>
                            </div>
                            <div data-popper-arrow></div>
                        </div>
                    </div>
                    
                </div>
                <div className="flex justify-end items-center">
                    
                    <div id="widgetDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="widgetDropdownButton">
                            <li>
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279" />
                                </svg>Edit widget
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                </svg>Download data
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z" />
                                </svg>Add to repository
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                                </svg>Delete widget
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="py-6" id="pie-chart"></div>

            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mb-4">
            </div>
            {/* <button
            onClick={() => navigate("/TransTable")}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-300 ease-in-out"
            style={{ backgroundColor: colors.green, color: colors.mint }}
          >
            View Full Report
          </button> */}
        </div>
    )
}

export default PieChart