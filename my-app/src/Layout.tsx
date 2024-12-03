import React from 'react';
import { Outlet } from "react-router-dom";
import Navigator from './Navigation/Navigator';
import { useAuth } from './useAuth';

const Layout: React.FC = () => {
    const { isAuthenticated } = useAuth(); 

    return (
        <div>
            <Navigator isAuthticated={isAuthenticated} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;