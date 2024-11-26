import React from "react";
import { Routes, Route } from "react-router-dom";
import IndividualStockComponent from "./IndividualStockViewer/IndividualStockComponent";


const StockRouter: React.FC = () => {
  return (
    <Routes>
      <Route path=":stockTicker" element={<IndividualStockComponent/>} />
    </Routes>
  );
};

export default StockRouter;