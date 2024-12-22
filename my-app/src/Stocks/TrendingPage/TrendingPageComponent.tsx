
import React, { useEffect, useState } from "react";
import { AuthType } from "../../Interfaces/AuthType";
import TrendingPageAPIService from "./TrendingPageAPIService";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel CSS
import './TrendingPageComponent.css'
import { Link } from "react-router-dom";

type isAuthenticated = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<AuthType>>;
  }
const TrendingPageComponent: React.FC<isAuthenticated> = ({setIsAuthenticated}) => {
    const [trendingStocks, setTrendingStocks] = useState<any[] | []>([]);

    useEffect(() => {
        const getTrendingStocks = async() => {
            try {
                const response = await TrendingPageAPIService.getTrendingPage();
                console.log(response.data.Stock.Stock)
                setTrendingStocks(response.data.Stock.Stock)
            } catch (error) {
                console.log(error)
            }
        }
        getTrendingStocks()
    }, [])
    if (!trendingStocks) {
        return <img src="/LoadingImg/loading.gif" alt='loading' className="loadingImg"></img>; 
    }
    return (
        <div className="TrendingPageBody">
            <div className="titleDescription">
                <h1 className="title">Trending Stock Page</h1>
                <p className="description">This Page Illistrates which Stocks are doing very well and which stocks arent in the Market.
                    There are multiple categories such as the 52 Week High and Low which illistrates how these stocks are preforming based on its Price 
                    for the last year. The Percent Gainers, Percent Losers and Net Gainers show the best and worst preforming stocks on the last trading day
                </p>
            </div>
            {trendingStocks.map((trendingStockCategory: any, index: number) => {
                // Check if data is valid
                if (trendingStockCategory.Data?.msg === "Cannot get the Trending stock data") {
                    return null;
                }
                return (
                    <div key={index} className="TrendingStockCategory">
                        <h2>{trendingStockCategory.DataType}</h2>
                        <Carousel showThumbs={true} infiniteLoop={true} autoPlay={true} interval={3000} showStatus={true} centerMode={true} centerSlidePercentage={33.33} >
                            {trendingStockCategory.Data.Data.data.companyMovers.map((stock: any, stockIndex: number) => (
                                <Link to={`/stocks/${stock.symbol}`} key={stockIndex} className="TrendingStockItem">
                                    <h3>{stock.companyName}</h3>
                                    <p className="data symbol">{stock.symbol}</p>
                                    <p className="data">Price: {stock.priceLastFormatted}</p>
                                    <p className="data">Price Change: {stock.priceChangeFormatted}</p>
                                    <p className="data">Price Change Percentage: {stock.priceChangePercentFormatted}</p>
                                    <p className="data">52 Week High: {stock.priceHigh52WeekFormatted}</p>
                                    <p className="data">52 Week Low: {stock.priceLow52WeekFormatted}</p>
                                    <p className="data">Volume: {stock.volumeFormatted}</p>                            
                                </Link>
                            ))}
                        </Carousel>
                    </div>
                );
            })}
        </div>
    );
}
export default TrendingPageComponent;