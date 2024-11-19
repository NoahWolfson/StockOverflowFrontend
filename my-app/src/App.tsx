import React from 'react';
import logo from './logo.svg';
import IndividualStockComponent from './IndividualStockViewer/IndividualStockComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/stocks/:stockTicker' element={<IndividualStockComponent/>}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
