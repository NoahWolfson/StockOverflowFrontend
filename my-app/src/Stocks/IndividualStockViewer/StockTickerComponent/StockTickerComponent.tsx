import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IndividualStockViewerAPIService from "../IndividualStockViewerAPIService";
import IndividualStockComponent from "../IndividualStockComponent";
import { Console } from "console";
import './StockTickerComponent.css'
interface StockTickerProps {
    ticker?: string;
}

const StockTickerComponent: React.FC<StockTickerProps> = ({ticker}) => {
    const [Error, setError] = useState<any|null>(null);
    const [PrevPrice, setPrevPrice] = useState<Number| 0>(0);
    const [Price, setPrice] = useState<Number| 0>(0);
    const [Percentage, setPercentage] = useState<number| 0>(0);
    const [Change, setChange] = useState<Number| 0>(0);
    const [ChangeNumClassName, setChangeNumClassName] = useState<string>("");
    useEffect(() => {
        let interval: NodeJS.Timeout
        //this function is responsible for updating the stock ticker itself in a certain number of seconds decared by teh setInterval function
        const fetchStockTickerData = async () => {
            try {
                console.log(ticker)
                const fetchStockTickerData = await IndividualStockViewerAPIService.getBasicStockData(ticker || 'Err');
                console.log(fetchStockTickerData);
                console.log('again')
                setPrevPrice(Price)
                setPrice(Number(fetchStockTickerData[0]['Data']['quoteSummary']['result'][0]["price"]['regularMarketPrice']['fmt']));
                setChange(fetchStockTickerData[0]['Data']['quoteSummary']['result'][0]["price"]['regularMarketChange']['fmt']);
                setPercentage(fetchStockTickerData[0]['Data']['quoteSummary']['result'][0]["price"]['regularMarketChangePercent']['fmt']);
                changeClassName(Price, PrevPrice);
            } catch (err:any) {
                console.error(err);
                setError('Cannot Provide the Data now');
            }
        }
        fetchStockTickerData();
        interval = setInterval(fetchStockTickerData, 5000);
        return () => clearInterval(interval);
        function changeClassName(curr: Number, prev: Number) {
            console.log('prev ' + prev + " "+ curr)
            if (curr === prev) {
                setChangeNumClassName('increase');
            } else if (curr < prev) {
                setChangeNumClassName('decrease');
            } else {
                setChangeNumClassName('');
            }
            setTimeout(() => {
                setChangeNumClassName("");
            }, 500)
        }
    }, [PrevPrice, Price, ticker])
    return (
        <div className="stockTicker">
            <div className="change_percentage_container">
                <p className={`price_label percentage ${ChangeNumClassName}`}>%{(Percentage).toString()}</p>
            </div>
            <div className="market_cap_container">
                <p className="price_label market_cap">{Price.toString()}</p>
            </div>
            <div className="change_container">
                <p className={`price_label change ${ChangeNumClassName}`}>${Change.toString()}</p>
            </div>
        </div>
    );
}

export default StockTickerComponent;