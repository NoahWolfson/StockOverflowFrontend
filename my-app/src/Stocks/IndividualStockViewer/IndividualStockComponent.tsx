import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IndividualStockViewerAPIService from "./IndividualStockViewerAPIService";
import StockTickerComponent from "./StockTickerComponent/StockTickerComponent";
import StockChartComponent from "./ChartComponent/StockChartComponent";
import NewsComponent from "./NewComponents/NewsComponent";
import StockSummaryComponent from "./StockSummary/StockSummaryComponent";
import CompanyOverviewComponent from "./CompanyOverview/CompanyOverviewComponent";
import './IndividualStock.css'
import EarningsChartComponent from "./EarningsComponent/EarningsComponent";
import StockFinancialComponent from "./StockFinancialDataComponent/StockFinancialDataComponent";
type StockPageParams = {
    stockTicker?: string; 
}

const IndividualStockComponent: React.FC = () => {

    const { stockTicker } = useParams<StockPageParams>();
    const [message, setMessage] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);
    useEffect(() => {
        const fetchMessage = async () => {
          try {
            const fetchedMessage: any = await IndividualStockViewerAPIService.getIndStockData(stockTicker || 'Err');
            console.log(fetchMessage)
            setMessage(fetchedMessage);
          } catch (err: any) {
            setError(err.message);
          }
        };
      
        fetchMessage();
      }, [stockTicker]);
      if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
      }
    
      if (!message) {
        return <p>Loading...</p>; // Render a loading state while fetching data
      }
      
      return (
        <div className="body">
          <h1 className="StockName">{`${message.Summary.Data.QuoteOutput.Name} (${message.Summary.Data.QuoteOutput.Symbol})`}</h1>
          <div className="StockTickerComponent container">
            <StockTickerComponent ticker={stockTicker}/>    
          </div>
          <div className="StockChartComponent container">
            <StockChartComponent ticker={stockTicker}/>
          </div>
          <div className="StockSummaryContainer container">
            <h3 className="ContainerTitle">Stock Summary</h3>
            <StockSummaryComponent data={message.Summary.Data}/>
          </div>
          <div className="EarningsContainer container">
            <h3 className="ContainerTitle">Earnings</h3>
            <EarningsChartComponent data={message.Earnings.Data.body.earnings.financialsChart.quarterly}/>
          </div>
           <div className="CompanyOverviewContainer container">
            <h3 className="ContainerTitle">Company Overview</h3>
            <CompanyOverviewComponent data={message.Company_Info.Data}/>
          </div>
          <div className="StockFinancialContainer container">
            <h3 className="ContainerTitle">Stock Financial</h3>
            <StockFinancialComponent data={message.Financial.Data.body}/>
          </div>
          <div className="StockNewsComponenet container">
            <h3 className="ContainerTitle">News</h3>  
            <NewsComponent data={Array.isArray(message.News.Data.data.main.stream) ? message.News.Data.data.main.stream : []}/>
          </div> 
        </div>
      );
}
export default IndividualStockComponent; 