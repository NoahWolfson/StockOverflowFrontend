import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import StockSearcherAPIService from "./StockSearcherAPIService";
import { AuthType } from "../../Interfaces/AuthType";
import { Link, useNavigate } from "react-router-dom";
import './StockSearcher.css'
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

const StockSearcherComponent: React.FC<isAuthenticated> = ({setIsAuthenticated}) => {
    const [searchTicker, setSearchTicker] = useState("");
    const [searchRecommendations, setSearchRecommendations] = useState<StockRecommendation[] | []>([]);
    const navigator = useNavigate();

    async function SuggestionChecker(e: ChangeEvent<HTMLInputElement>): Promise<void> {
        const inputValue = e.target.value;// Use the latest value directly
        console.log(inputValue)
        if (inputValue === "") {
            setSearchTicker("")
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
        getStockSearcher();
    }, [setIsAuthenticated])
    function StockSearchSearchHandler(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault(); 
        navigator(`/stocks/search-results/${searchTicker}`);
    }

    return  (
        <div className="StockSearcherBody">
            <div className="searchLogoContainer">
                <img className='SearcherLogo' src="/StockOverflowSearcher.png" alt="StockSearcher"></img>
            </div>
            <div className="SearchContainer">
                <form className="SearchForm" onSubmit={StockSearchSearchHandler}>
                    <div className="SearchBarContainer">
                        <input
                            type="text"
                            placeholder="Search for stocks..."
                            value={searchTicker}
                            onChange={SuggestionChecker}
                            className="SearchBar"
                        />
                        <button type="submit" className="SearchButton">
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
    );
}
export default StockSearcherComponent;