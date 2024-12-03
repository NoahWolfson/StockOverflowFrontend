import React, { useEffect, useState } from "react";
import GenrelRoutesAPIService from "../GenrelRoutesAPIService";
import { useAuth } from "../../useAuth";

const HomeComponent: React.FC = () => {
    const { setIsAuthenticated } = useAuth(); 
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                console.log('before')
                const response = await GenrelRoutesAPIService.getHomeData();
                console.log(response)
                setIsAuthenticated(response.isAuthenticated);
            } catch (error) {
                console.log("Failed to fetch home data:", error);
                setIsAuthenticated(false); 
            }
        };

        fetchHomeData();
    }, [setIsAuthenticated]);
    return (
        <div className="body">
            <body>
                <p>Home</p>
            </body>
        </div>
        
    )
}
export default HomeComponent;