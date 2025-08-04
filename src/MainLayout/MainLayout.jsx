import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar/Navbar';
import Footer from '../component/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>

            <div className='container min-h-screen mx-auto px-2'>
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;