import React, { useEffect, useState } from "react";

import './UserStockComponent.css'
import { useNavigate } from "react-router-dom";


interface UserStocks {
    stockData?: any[];
}


const UserStockComponent: React.FC<UserStocks> = ({stockData}) => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    /**
     * this method is responsible to navigate to the specific stock the user clicked on 
     */
    const goToStock = (stockTicker?: any) => {
        navigate(`/stocks/${stockTicker}`)
    }
    console.log(stockData)
    return (
        <div className="userStocks">
            <ul className="stock-list">
                {stockData?.map((stock, index) => {
                    const data = stock.Data.Data?.quoteSummary?.result?.[0]?.price
                    return (<li className="ind-stock">
                        <div className="stock-box" onClick={() => goToStock(data?.symbol)}>
                            <p className="stock-name">{data?.shortName}</p>
                            <div className="stock-details">
                                <p className="stock-percentage">                                        
                                    {data?.regularMarketChangePercent?.fmt}
                                </p>
                                <p className="stock-price">
                                    {data?.regularMarketPrice?.fmt}
                                </p>
                                <p className="stock-change">
                                    {data?.regularMarketChange?.fmt}
                                </p>
                             </div>
                        </div>
                    </li>) 
                    })}
                </ul>
            </div>
    )  

    
}

export default UserStockComponent;

