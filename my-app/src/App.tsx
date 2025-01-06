import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthenticationComponent from './Authentication/AuthenticationPage';
import Layout from './Layout';
import StockRouter from './Stocks/StocksRouter';
import { AuthProvider } from './useAuth';
import HomeComponent from './GeneralRoutes/Home/HomeComponent';
import UserRouter from './UserPages/UserRouter';
import ForumRouter from "./Forum/ForumRouter";
import NotFoundComponent from './GeneralRoutes/404NotFound/404NotFound';
import LoadingComponent from './GeneralRoutes/LoadingPage/LoadingComponent';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path='/404' element={<NotFoundComponent/>}/>
        <Route path='/loading' element={<LoadingComponent/>} />
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeComponent/>} /> {/* Default path */}
          {/* Use StockRouter for dynamic stock routes */}
          <Route path='stocks/*' element={<StockRouter />} />
           <Route path='public-forum/*' element={<ForumRouter/>}></Route>
          <Route path='auth/*' element={<AuthenticationComponent />} />
          <Route path='user/*' element={<UserRouter/>} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
    
  );
}

export default App;