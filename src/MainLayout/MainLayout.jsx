import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar/Navbar';
import Footer from '../component/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>

            <div className='container mx-auto px-2 md:px-4'>
                <Outlet />
            </div>

            <Footer/>
        </div>
    );
};

export default MainLayout;