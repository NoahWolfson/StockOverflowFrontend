import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import StockSearcherAPIService from "../StockSearcherAPIService";
import { AuthType } from "../../../Interfaces/AuthType";
import { Link, useNavigate, useParams } from "react-router-dom";
import './StockResultsComponent.css'

type isAuthenticated = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<AuthType>>;
  }
type StockRecommendation = {
    name: string,
    region: string,
    securityType: string,
    shortBio: string,
    symbol: string
}
type StockPageParams = {
    stockTicker?: string
}
const StockResultsComponent: React.FC<isAuthenticated> = ({setIsAuthenticated}) => {
    const [searchTicker, setSearchTicker] = useState("");
    const { stockTicker } = useParams<StockPageParams>();
    const [searchRecommendations, setSearchRecommendations] = useState<StockRecommendation[] | []>([]);
    const [searchResults, setSearchResults] = useState<StockRecommendation[] | []>([])
    const navigator = useNavigate();

    async function SuggestionChecker(e: ChangeEvent<HTMLInputElement>): Promise<void> {
        const inputValue = e.target.value;// Use the latest value directly
        console.log(inputValue)
        if (inputValue === "") {
            setSearchTicker("")
            setSearchRecommendations([]);
            return;
        }
        setSearchTicker(inputValue);
        try {
            const response = await StockSearcherAPIService.getSearchRecommendations(inputValue);
            setSearchRecommendations(response.data[0].Data.Data);
            console.log(searchRecommendations)
        } catch (error) {
            setSearchRecommendations([]);
        }
    }
    useEffect(() => {
        const getStockSearcher = async () => {
            try {
                const response = await StockSearcherAPIService.getSearcher();
                console.log(response)
                setIsAuthenticated({'accountId': response.data.currUser, picStr:  response.data.profilePicture})
            } catch(error) {
                console.log(error);
            }
        }
        const getSearchResults = async () => {
            try {
                const response = await StockSearcherAPIService.getSearchRecommendations(stockTicker);
                setSearchResults(response.data[0].Data.Data);
                console.log(searchRecommendations)
            } catch (error) {
                setSearchRecommendations([]);
            }
        }
        getStockSearcher();
        getSearchResults();
    }, [searchRecommendations, setIsAuthenticated, setSearchResults, stockTicker, navigator])
    function StockSearchSearchHandler(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault(); 
        navigator(`/stocks/search-results/${searchTicker}`);
    }
    if (!searchResults) {
        return <img src="/LoadingImg/loading.gif" alt='loading' className="loadingImg"></img>; 
    }
    return  (
        <div className="StockResultsBody">
            <div className="SeacherContainer">
                <div className="searchLogoContainerResult">
                    <img className='SearcherLogoResult' src="/StockOverflowSearcher.png" alt="StockSearcher"></img>
                </div>
                <div className="SearchContainerResult">
                    <form className="SearchFormResult" onSubmit={StockSearchSearchHandler}>
                        <div className="SearchBarContainerResult">
                            <input
                                type="text"
                                placeholder="Search for stocks..."
                                value={searchTicker}
                                onChange={SuggestionChecker}
                                className="SearchBarResult"
                            />
                            <button type="submit" className="SearchButtonResults">
                                Search
                            </button>
                        </div>
                    </form>
                    {searchRecommendations.length > 0 && (
                        <div className="RecommendationsDropdown">
                            {searchRecommendations.map((stock, index) => (
                                <Link to={`/stocks/${stock.symbol}`} key={index} className="RecommendationItem">
                                    <p className="RecommendationSymbol">{stock.symbol}</p>
                                    <p className="RecommendationName">{stock.name}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
                {searchResults.length > 0 && (
                    <div className="resultsContainer">
                        {searchResults.map((stock, index) => (
                            <Link to={`/stocks/${stock.symbol}`} key={index} className="result">
                                <p className="stockName">{stock.name + ` (${stock.symbol})`}</p>
                                <p className="stockAbout">{stock.shortBio}</p>
                            </Link>
                        ))}
                    </div>
                )}
        </div>
    );
}
export default StockResultsComponent;