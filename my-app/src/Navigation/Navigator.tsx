import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './navigation.css';
import AtuhAPIService from "../Authentication/AuthBackendRoutes";
import { AuthType } from "../Interfaces/AuthType";

interface Authenticated {
    isAuthticated: AuthType
}

export const Navigator: React.FC<Authenticated> = ({isAuthticated}) => {
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsShrunk(scrollPosition > 50); // Shrink navbar if scrolled down 50px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const logout = async () => {
        try {
            await AtuhAPIService.LogoutUser();
        } catch (error) {
            console.log('error logging out person')
        }
        
    }
    return (
        <header className={`header ${isShrunk ? "shrink" : ""}`}>
            {/* Logo Section */}
            <div className="logo">
                <img src="/StockOverflowLogo.png" alt="logo" />
            </div>

            {/* Navigation Bar */}
            <nav className="navigation">
                <div className="site_pages">
                    <div className="ind_navigator_container">
                        <Link className="ind_navigator" to="/">Home</Link>
                    </div>
                    <div className="ind_navigator_container">
                        <Link className="ind_navigator" to="/about">About</Link>
                    </div>
                    <div className="ind_navigator_container">
                        <Link className="ind_navigator" to="/public-forum">Public Forum</Link>
                    </div>
                    <div className="ind_navigator_container">
                        <Link className="ind_navigator" to="/stocks">Stocks</Link>
                    </div>
                    <div className="ind_navigator_container">
                        <Link className="ind_navigator" to="/stocks/trending-page">Trending Page</Link>
                    </div>
                </div>
                <div className="login_container">
                    <div className="ind_navigator_container">
                        {isAuthticated.isAuth !== ""? <p className="ind_navigator" onClick={logout}>Logout</p> : <Link className="ind_navigator" to="/auth/login">Login</Link>}
                    </div>
                    <div className="profile-pic-container">
                        {isAuthticated.isAuth ? <Link to={`/user/${isAuthticated.isAuth}/profile`}><img className="profile-pic" alt='profileImg' src={isAuthticated.picStr !== "" || isAuthticated.picStr ? isAuthticated.picStr : "/profile-default-img.png"}></img></Link> : ""}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navigator;