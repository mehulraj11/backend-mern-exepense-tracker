import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875cf5", "#fa2c37", "#ff6900", "#4f39f6"];

const RecentIncomeWithCard = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const preparedChartData = () => {
    if (data && data.length > 0) {
      const dataArr = data.map((item) => {
        console.log("Preparing chart data for:", item); // Debugging log
        return {
          name: item?.source,
          amount: item?.amount,
        };
      });

      setChartData(dataArr);
    } else {
      console.log("No data available to prepare chart.");
    }
  };

  useEffect(() => {
    preparedChartData();
  }, [data]);

  // Log the chartData to check if it's getting set correctly
  useEffect(() => {
    console.log("Chart Data Updated: ", chartData);
  }, [chartData]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome.toLocaleString("en-IN")}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithCard;
