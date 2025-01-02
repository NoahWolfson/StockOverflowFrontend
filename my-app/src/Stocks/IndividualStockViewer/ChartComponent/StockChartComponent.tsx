import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import IndividualStockViewerAPIService from "../IndividualStockViewerAPIService";
import { StockPageParams } from "../../../Interfaces/StockTickerParam";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


/**
 * this component will shouw the changes of the  stock price throughout a current market day represented as a chart. teh x values will be the time of day while teh y values is the stock price.
 * @param stockTicker- the stock symbol in the url  
 * @returns 
 */
const StockChartComponent: React.FC<StockPageParams> = ({ stockTicker }) => {
  const [Error, setError] = useState<string>("");
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Stock Prices",
        data: [],
        borderColor: "rgba(75,192,192,1)", // Line color
        backgroundColor: "rgba(75,192,192,0.2)", // Fill under the line
        pointBackgroundColor: "rgba(75,192,192,1)", // Point color
        pointBorderColor: "#fff",
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch stock chart data

        const response = await IndividualStockViewerAPIService.getIndStockChartData(stockTicker || "Err");
        console.log(response)
        // Process the response to extract labels and values
        const labels = Object.keys(response['Stock']['chart']);
        const data = Object.values(response['Stock']['chart']);

        // Set chart data
        setChartData({
          labels,
          datasets: [
            {
              label: "Stock Prices",
              data,
              borderColor: response['isUp'] ? "rgba(75,192,192,1)": "rgba(255,0,0,1)", // Line color
              backgroundColor: "rgba(75,192,192,0.2)", // Fill under the line
              pointBackgroundColor: "rgba(75,192,192,1)", // Point color
              pointBorderColor: "#fff",
            },
          ],
        });

        // Set chart options
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              display: true, // Show legend
              position: "top" as const, // Legend position
            },
            title: {
              display: true,
              text: "Stock Price Today", // Chart title
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time Today", // X-axis label
              },
            },
            y: {
              title: {
                display: true,
                text: "Price (USD)", // Y-axis label
              },
              beginAtZero: false, // Y-axis starts at 0
            },
          },
        });
      } catch (err: any) {
        console.error(err);
        setError("Cannot Display Chart at this time");
      }
    };

    fetchChartData();
  }, [stockTicker]);

  return (
    <div style={{ width: "70%", margin: "0 auto" }}>
      {Error ? (
        <p style={{ color: "red" }}>{Error}</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default StockChartComponent;