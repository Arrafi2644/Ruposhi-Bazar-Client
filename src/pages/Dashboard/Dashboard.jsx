import React from 'react';
import useAuth from '../../hooks/useAuth';
import Link from 'daisyui/components/link';
import { NavLink, Outlet } from 'react-router-dom';
import "./dashboard.css"

const Dashboard = () => {
    const { user } = useAuth();
    const isAdmin = true

    // User routes 
    const userRoutes = <>
        <li className=' border-gray-300'><NavLink to='/dashboard/my-orders' >My Orders</NavLink></li>
        {/* <li className='border-b border-gray-300 bottom-0'><NavLink to={"/"}>Profile</NavLink></li> */}
    </>

    // Admin routes
    const adminRoutes = <>
        <li className=' border-gray-300'><NavLink to='/dashboard/all-orders' >Orders</NavLink></li>
        {/* <li className='border-b border-gray-300 bottom-0'><NavLink to={"/"}>Profile</NavLink></li> */}
    </>
    return (
        <div className='my-6 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 '>
            <div className='border p-4 rounded-sm border-gray-300 bg-yellow-900 text-white'>
                <h3 className='text-xl font-semibold text-center mb-4'>{user?.displayName}</h3>
                <ul tabIndex={0} className="dropdown-content menu w-full p-0">
                    {
                        isAdmin ? adminRoutes : userRoutes
                    }

                </ul>
            </div>
            <div className='col-span-1 lg:col-span-2 xl:col-span-3 border border-gray-300 p-4 rounded-sm'>
                <Outlet>

                </Outlet>
            </div>
        </div>
    );
};

export default Dashboard;