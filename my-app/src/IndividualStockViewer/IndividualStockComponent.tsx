import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IndividualStockViewerAPIService from "./IndividualStockViewerAPIService";
import StockTickerComponent from "./StockTickerComponent/StockTickerComponent";
import StockChartComponent from "./ChartComponent/StockChartComponent";
type StockPageParams = {
    stockTicker?: string; 
}

const IndividualStockComponent: React.FC = () => {
    const navigate = useNavigate();
    const { stockTicker } = useParams<StockPageParams>();
    const [message, setMessage] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);
    // useEffect(() => {
    //     const fetchMessage = async () => {
    //       try {
    //         const fetchedMessage = await IndividualStockViewerAPIService.getIndStockData(stockTicker || 'Err');
    //         console.log(fetchMessage)
    //         setMessage(fetchedMessage);
    //       } catch (err: any) {
    //         setError(err.message);
    //       }
    //     };
      
    //     fetchMessage();
    //   }, [stockTicker]);
      return (
        <div>
          <h1 className="StockName">{stockTicker}</h1>
          <div className="StockTickerComponent">
            <StockTickerComponent ticker={stockTicker}/>    
          </div>
          <div className="StockChartComponent">
            <StockChartComponent ticker={stockTicker}/>
          </div>
        </div>
      );
}
export default IndividualStockComponent; 