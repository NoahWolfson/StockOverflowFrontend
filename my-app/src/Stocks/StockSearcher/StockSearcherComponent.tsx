import React, { ChangeEvent, useState } from "react";
import StockSearcherAPIService from "./StockSearcherAPIService";
type isAuthenticated = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  }
const StockSearcherComponent: React.FC<isAuthenticated> = ({setIsAuthenticated}) => {
    const [searchTicker, setSearchTicker] = useState("");
    const [searchRecommendations, setSearchRecommendations] = useState<any | null>(null);

    async function SuggestionChecker(e: ChangeEvent<HTMLInputElement>): Promise<void> {
        setSearchTicker(e.target.value);
        try {
            const response = await StockSearcherAPIService.getSearchRecommendations(searchTicker);
            setSearchRecommendations(response.Data);
        } catch (error) {
            setSearchRecommendations({});
        }
    }

    return (
        <div className="body">
            <div className="SearchImageContainer">
                <img className='Searcher' src="/StockOverflowSeracher.png" alt="StockSearcher"></img>
            </div>
            <form className="SearchContainer">
                <div className="SearchBarContainer">
                    <input type="text" placeholder="Search..." onChange={SuggestionChecker}></input>
                    <button type="submit">Search</button>
                </div>
                
            </form>
        </div>
    )
}
export default StockSearcherComponent