import React from 'react';
import logo from './logo.svg';
import IndividualStockComponent from './Stocks/IndividualStockViewer/IndividualStockComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Authentication/SignUpRoutes/SignUp';
import AuthenticationComponent from './Authentication/AuthenticationPage';
import IndividualQuestionComponent from "./Forum/IndividualQuestionPage/IndividualQuestionComponent";
import QuestionPage from "./Forum/QuestionPage";
import Layout from './Layout';
import StockRouter from './Stocks/StocksRouter';
import { AuthProvider } from './useAuth';
import HomeComponent from './GeneralRoutes/Home/HomeComponent';
import UserRouter from './UserPages/UserRouter';
import QuestionsRouter from "./Forum/QuestionsRouter";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeComponent/>} /> {/* Default path */}
          <Route path='about'></Route>
          {/* Use StockRouter for dynamic stock routes */}
          <Route path='stocks/*' element={<StockRouter />} />
           <Route path='public-forum/*' element={<QuestionsRouter/>}></Route>
          <Route path='auth/*' element={<AuthenticationComponent />} />
          <Route path='user/*' element={<UserRouter/>} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
    
  );
}

export default App;