import React from 'react';
import logo from './logo.svg';
import IndividualStockComponent from './Stocks/IndividualStockViewer/IndividualStockComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Authentication/SignUpRoutes/SignUp';
import AuthenticationComponent from './Authentication/AuthenticationPage';
import IndividualQuestionComponent from "./Forum/IndividualQuestionPage/IndividualQuestionComponent";
import QuestionPage from "./Forum/QuestionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/stocks/*' element={<IndividualStockComponent/>}></Route>
          <Route path='/forum/*' element={<QuestionPage/>}></Route>
          <Route path='/auth/*' element={<AuthenticationComponent/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
