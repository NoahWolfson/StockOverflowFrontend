import React, { useEffect, useState } from "react";
import "./StockSummary.css"
import { StockData } from "../../../Interfaces/StockData";

/**
 * this component is responsible for showing the relevant stock for a particular stock. 
 * @param data - the stock data for the stock
 * @returns 
 */
const StockSummaryComponent: React.FC<StockData> = ({data}) => {
    
    if (!data) {
        return <p>Loading...</p>
    }
    return (
    <div className="StockSummaryComponent">
            <div className="data_container underline">
                <p className="data_name data_text">Open</p>
                <p className="data data_text">{data['QuoteOutput']['PriceOpen']}</p>
            </div>
            <div className="data_container underline">
                <p className="data_name data_text">Price Previous Close</p>
                <p className="data data_text">{data['QuoteOutput']['PricePreviousClose']}</p>
            </div>
            <div className="data_container underline">
                <p className="data_name data_text">Today's High</p>
                <p className="data data_text">{data['QuoteOutput']['High']}</p>
            </div>
            <div className="data_container underline">
                <p className="data_name data_text">Today's Low</p>
                <p className="data data_text">{data['QuoteOutput']['Low']}</p>
            </div>
            <div className="data_container underline">
                <p className="data_name data_text">52 Week High</p>
                <p className="data data_text">{data['QuoteOutput']['High52Week']}</p>
            </div>
            <div className="data_container underline">
                <p className="data_name data_text">52 Week Low</p>
                <p className="data data_text">{data['QuoteOutput']['Low52Week']}</p>
            </div>


            <div className="data_container">
                <p className="data_name data_text">Volume</p>
                <p className="data data_text">{data['QuoteOutput']['Volume']}</p>
            </div>
            <div className="data_container">
                <p className="data_name data_text">Average Volume - 10 Day</p>
                <p className="data data_text">{data['QuoteOutput']['AverageVolume10Day']}</p>
            </div>
            <div className="data_container">
                <p className="data_name data_text">Market Cap</p>
                <p className="data data_text">{data['QuoteOutput']['MarketCap']}</p>
            </div>
            <div className="data_container">
                <p className="data_name data_text">Shares Outstanding</p>
                <p className="data data_text">{data['QuoteOutput']['SharesOutstanding']}</p>
            </div>
            <div className="data_container">
                <p className="data_name data_text">Divident Yield</p>
                <p className="data data_text">{data['DividendsOutput']['PaysDividends'] ? data['DividendsOutput']['Amount'] : 0}</p>
            </div>
            <div className="data_container">
                <p className="data_name data_text">Next Earnings Date</p>
                <p className="data data_text">{data['EarningsOutput']['NextEarningsDate']}</p>
            </div>
        
    </div>
    )
}
export default StockSummaryComponent;