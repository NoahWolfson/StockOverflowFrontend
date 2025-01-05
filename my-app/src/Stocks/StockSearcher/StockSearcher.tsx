import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import StockSearcherAPIService from "./StockSearcherAPIService";
import { AuthType } from "../../Interfaces/AuthType";
import debounce from "lodash.debounce";

import { Link, useNavigate } from "react-router-dom";
import './StockSearcher.css'
import { StockRecommendation } from "../../Interfaces/StockRecommendation";
import { isAuthenticated } from "../../Interfaces/IsAuthenticated";



const StockSearcherComponent: React.FC<isAuthenticated> = ({setIsAuthenticated}) => {
    const [searchTicker, setSearchTicker] = useState("");
    const [searchRecommendations, setSearchRecommendations] = useState<StockRecommendation[] | []>([]);
    const navigator = useNavigate();
    /**
     * this method is responsible for fetching the search recommendations. teh debounce method, was recommedned by chat gpt to slow down the api calls so the search 
     * recommendations shouldnt populate when the searchbar is empty 
     */
    const fetchSearchRecommendations = useCallback(
        debounce(async (inputValue: string) => {
            if (inputValue === "") {
                setSearchRecommendations([]);
                return;
            }
            try {
                const response = await StockSearcherAPIService.getSearchRecommendations(inputValue);
                setSearchRecommendations(response.data[0].Data.Data);
            } catch (error) {
                setSearchRecommendations([]);
            }
        }, 300), // Debounce with a delay of 300ms
        []
    );

    const SuggestionChecker = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value;
        setSearchTicker(inputValue);

        // Call the debounced function
        fetchSearchRecommendations(inputValue);
    };
    /**
     * this lamda expression is called on the onset of the page being rendered to get the user information 
     */
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
                            <img className='searchIcon' src="/SearchIcons/searchIcon.png" alt=""></img>
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