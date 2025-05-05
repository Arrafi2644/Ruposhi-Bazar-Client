import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>

            <div className='container mx-auto px-2'>
                <Outlet />
            </div>

            
        </div>
    );
};

export default MainLayout;