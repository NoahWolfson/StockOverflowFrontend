import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { StockData } from "../../../Interfaces/StockData";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * this component is responsible for showing the earnings for each quarter or a year for a particular stock. 
 * @param data - the earnigns data for the stock
 * @returns 
 */
const EarningsChartComponent: React.FC<StockData> = ({ data }) => {
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: [],
      });
    
      const [options, setOptions] = useState<any>({
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const, // Position of the legend
          },
          title: {
            display: true,
            text: "Grouped Bar Graph Example", // Title of the graph
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months", // X-axis label
            },
            stacked: false, // Ensure bars are grouped and not stacked
          },
          y: {
            title: {
              display: true,
              text: "Values", // Y-axis label
            },
            beginAtZero: true, // Y-axis starts at 0
          },
        },
      });
    useEffect(() => {
        const arrayData = Array.isArray(data) ? data : Object.values(data);
        let dates: string[] = [];
        let revenue: number[] = [];
        let earnings: number[] = [];
        arrayData.forEach(quarterData => {
            dates.push(quarterData.date);
            revenue.push(Number(quarterData['revenue']['longFmt'].replace(/,/g, "")));
            earnings.push(Number(quarterData['earnings']['longFmt'].replace(/,/g, "")));
        })
        console.log('earnings and revenue')
        console.log(revenue)
        console.log(earnings)
        setChartData({
            labels: dates,
            datasets: [{
                label: "Revenue",
                data: revenue,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Earnings",
                data: earnings,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            }
            ]
        })
        
    }, [data])
    if (!data) {
        return (
            <p>Loading...</p>
        )
    }
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EarningsChartComponent;