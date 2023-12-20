import { useProtectedRoute } from "../components/useProtectedRoute";
import { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import AreaChart from "../components/AreaChart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTransactionFromDB } from '../utils/firebase-config';
import { getSurveyDB } from '../utils/firebase-config';


const DataVis = () => {
    const navigate = useNavigate();
    return (
        
        <div>
            <p className="font-bold text-xl tracking-tight text-darkgreen ml-16 sm:text-2xl md:text-3xl">Your Data Visual Insights</p>
            <div className="mt-6 flex flex-row ml-16">
            {/* <button
            onClick={() => navigate("/TransTable")}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-300 ease-in-out"
            style={{ backgroundColor: colors.green, color: colors.mint }}
          >
            View Full Report
          </button> */}
                <div className="flex-1 basis-1/3 mr-14 h-4/5">
                    <LineChart />  </div>
                <div className="flex-1 basis-1/3 h-4/5">
                    <AreaChart />  </div>
                <div className="flex-1 basis-1/3 h-4/5">
                    <PieChart />
                </div>
            </div>
            
        </div>

    );
}

export default DataVis;
