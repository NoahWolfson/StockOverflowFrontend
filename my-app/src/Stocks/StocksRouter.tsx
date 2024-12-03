import React from "react";
import { Routes, Route } from "react-router-dom";
import IndividualStockComponent from "./IndividualStockViewer/IndividualStockComponent";
import { useOutletContext } from 'react-router-dom';
import { useAuth } from "../useAuth";


const StockRouter: React.FC = () => {
  const { setIsAuthenticated } = useAuth(); 
  return (
    <Routes>
      <Route path=":stockTicker" element={<IndividualStockComponent setIsAuthenticated={setIsAuthenticated}/>} />
    </Routes>
  );
};

export default StockRouter;