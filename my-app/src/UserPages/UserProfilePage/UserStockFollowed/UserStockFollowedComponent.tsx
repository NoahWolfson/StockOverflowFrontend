import React, { useEffect, useState } from "react";

import './UserStockComponent.css'
import { useNavigate } from "react-router-dom";
import UserAPIService from "../../UserAPIService";


interface UserStocks {
    stockData?: any[];
    accountId?: any;
}


const UserStockComponent: React.FC<UserStocks> = ({stockData, accountId}) => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    /**
     * this method is responsible to navigate to the specific stock the user clicked on 
     */
    const goToStock = (stockTicker?: any) => {
        navigate(`/stocks/${stockTicker}`)
    }
    const removeUserStock = async (stock?: any) => {
        try {
            const response = await UserAPIService.postRemoveUserStock(stock.shortName.toString(), accountId.toString(), stock.symbol.toString().toLowerCase())
            console.log(response)
            navigate(0)
        } catch (error) {
            console.log(error);
            setError('Some Error happened, try again later')
        }
    }
    console.log(stockData)
    return (
        <div className="userStocks">
            <ul className="stock-list">
                {stockData?.map((stock, index) => {
                    const data = stock.Data.Data?.quoteSummary?.result?.[0]?.price
                    return (<li className="ind-stock">
                        {accountId !== "" ? <button className="x-btn" onClick={()=> removeUserStock(data)}>X</button> : ""}
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

