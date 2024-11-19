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

    const [StockTickerData, setStockTickerData] = useState<any| null>(null);
    const [Error, setError] = useState<any|null>(null);
    const [PrevPercentage, setPrevPercentage] = useState<Number| 0>(0);
    const [PrevChange, setPrevChange] = useState<Number| 0>(0);
    const [Price, setPrice] = useState<Number| 0>(0);
    const [Percentage, setPercentage] = useState<Number| 0>(0);
    const [Change, setChange] = useState<Number| 0>(0);
    const [ChangeNumClassName, setChangeNumClassName] = useState<string>("");
    useEffect(() => {
        let interval: NodeJS.Timeout
        const fetchStockTickerData = async () => {
            try {
                console.log(ticker)
                const fetchStockTickerData = await IndividualStockViewerAPIService.getBasicStockData(ticker || 'Err');
                console.log(fetchStockTickerData);
                console.log('again')
                setPrevChange(Change);
                setPrevPercentage(Percentage);
                setPrice(Number(fetchStockTickerData[0]['Data']['data']["price"]));
                setChange(Number(fetchStockTickerData[0]['Data']['data']["change"]));
                setPercentage(Number(fetchStockTickerData[0]['Data']['data']["change_percent"]));
                changeClassName(Number(fetchStockTickerData[0]['Data']['data']["price"]), PrevChange);
                changeClassName(Number(fetchStockTickerData[0]['Data']['data']["price"]), PrevPercentage);
            } catch (err:any) {
                console.error(err);
                setError('Cannot Provide the Data now');
            }
        }
        fetchStockTickerData();
        interval = setInterval(fetchStockTickerData, 10000);
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
            }, 5000)
        }
    }, [ticker])
    return (
        <div className="stockTicker">
            <div className="change_percentage_container">
                <p className={`percentage ${ChangeNumClassName}`}>{Percentage.toString()}</p>
            </div>
            <div className="market_cap_container">
                <p className="market_cap">{Price.toString()}</p>
            </div>
            <div className="change_container">
                <p className={`change ${ChangeNumClassName}`}>{Change.toString()}</p>
            </div>
        </div>
    );
}

export default StockTickerComponent;