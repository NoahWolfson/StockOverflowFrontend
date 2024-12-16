import React from "react";
import { Routes, Route } from "react-router-dom";
import IndividualStockComponent from "./IndividualStockViewer/IndividualStockComponent";
import { useOutletContext } from 'react-router-dom';
import { useAuth } from "../useAuth";
import StockSearcherComponent from "./StockSearcher/StockSearcher";
import StockResultsComponent from "./StockSearcher/SearchResultsComponent/StockResultsComponent";


const StockRouter: React.FC = () => {
  const { setIsAuthenticated } = useAuth(); 
  return (
    <Routes>
      <Route path="" element={<StockSearcherComponent setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path=":stockTicker" element={<IndividualStockComponent setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path="/search-results/:stockTicker" element={<StockResultsComponent setIsAuthenticated={setIsAuthenticated}/>}/>
    </Routes>
  );
};

export default StockRouter;