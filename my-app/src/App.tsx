import React from 'react';
import logo from './logo.svg';
import IndividualStockComponent from './Stocks/IndividualStockViewer/IndividualStockComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Authentication/SignUpRoutes/SignUp';
import AuthenticationComponent from './Authentication/AuthenticationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/stocks/*' element={<IndividualStockComponent/>}></Route>
        <Route path='/auth/*' element={<AuthenticationComponent/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
