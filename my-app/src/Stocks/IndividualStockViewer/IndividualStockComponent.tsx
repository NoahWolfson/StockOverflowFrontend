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
import LoadingComponent from "../../GeneralRoutes/LoadingPage/LoadingComponent";
import { isAuthenticated } from "../../Interfaces/IsAuthenticated";
import { StockPageParams } from "../../Interfaces/StockTickerParam";

/**
 * this page is responsible for showinginformation relevant about the stock such as the financials, news, stock summary, the ticker and the price changes throughout the day. Each of these major 
 * stock information categories are in diffierent components, which are thoroughly explained in the design document. Other than the stock chart and the stock ticker components where teh stock symbol 
 * is passed to them to do individual api calls (to make it real time), the rest of teh components get there stock data from the initial useEffect() which gets the stock data from the backend. that 
 * is then passed to each individual component to be formatted in its correct location
 * @param setIsAuthenticated -  a callback method meant to update the nav bar @see isAuthenticated
 * @returns 
 */
const IndividualStockComponent: React.FC<isAuthenticated> = ({setIsAuthenticated}) => {
    const [alertMsg, setAlertMsg] = useState("");
    const { stockTicker } = useParams<StockPageParams>();
    const [message, setMessage] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const fetchMessage = async () => {
          try {
            console.log('the ticker')
            console.log(stockTicker)
            const fetchedMessage: any = await IndividualStockViewerAPIService.getIndStockData(stockTicker || 'Err');
            console.log(fetchMessage)
            setMessage(fetchedMessage);
            let currUser: string = fetchedMessage.currUser;
            let currPic: string = fetchedMessage.profilePicture;
            setIsAuthenticated({'accountId': currUser, picStr:  currPic})
            setUserId(fetchedMessage.userId)
          } catch (err: any) {
            setError(err.message);
          }
        };
      
        fetchMessage();
      }, [stockTicker, setIsAuthenticated]);
      if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
      }
    
      if (!message) {
        return <LoadingComponent/>
        // return <img src="/LoadingImg/loading.gif" alt='loading' className="loadingImg"></img>; 
      }
      
  async function ProcessUserStock(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    try {
      console.log(message.Stock.Summary.Data.QuoteOutput.Name + " " + userId + " " + stockTicker);
      const response = await IndividualStockViewerAPIService.postSaveStockToUser(message.Stock.Summary.Data.QuoteOutput.Name, userId, stockTicker);
      console.log(response);
      if(response.status === 200) {
        setAlertMsg(response.data.msg);
      } else {
        setAlertMsg(response.msg);
      }
    } catch (error) {
      setAlertMsg("Error adding Stock, Please Try Again Later")
    }
  }

      return (
        <div className="StockBody">
          <div className={alertMsg !== "" ? "alertComponent" : "noAlertComponent"}>
                {alertMsg !== "" ? <p className="alertMsg">{alertMsg}</p>: <p></p>}
          </div>
          <h1 className="StockName">{`${message.Stock.Summary.Data.QuoteOutput.Name} (${message.Stock.Summary.Data.QuoteOutput.Symbol})`}</h1>
          <div className="StockTickerComponent container">
            <StockTickerComponent stockTicker={stockTicker}/>    
          </div>
          <button className="add-stock btn" onClick={ProcessUserStock}>Add Stock</button>
          <div className="StockChartComponent container">
            <StockChartComponent stockTicker={stockTicker}/>
          </div>
          <div className="StockSummaryContainer container">
            <h3 className="ContainerTitle">Stock Summary</h3>
            <StockSummaryComponent data={message.Stock.Summary.Data}/>
          </div>
          <div className="EarningsContainer container">
            <h3 className="ContainerTitle">Earnings</h3>
            <EarningsChartComponent data={message.Stock.Earnings.Data.body.earnings.financialsChart.quarterly}/>
          </div>
           <div className="CompanyOverviewContainer container">
            <h3 className="ContainerTitle">Company Overview</h3>
            <CompanyOverviewComponent data={message.Stock.Company_Info.Data}/>
          </div>
          <div className="StockFinancialContainer container">
            <h3 className="ContainerTitle">Stock Financial</h3>
            <StockFinancialComponent data={message.Stock.Financial.Data.body}/>
          </div>
          <div className="StockNewsComponenet container">
            <h3 className="ContainerTitle">News</h3>  
            <NewsComponent data={Array.isArray(message.Stock.News.Data.data.main.stream) ? message.Stock.News.Data.data.main.stream : []}/>
          </div> 
        </div>
      );
}
export default IndividualStockComponent; 