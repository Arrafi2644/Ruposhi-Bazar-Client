import React from 'react';
import useAuth from '../../hooks/useAuth';
import Link from 'daisyui/components/link';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth()
    return (
        <div className='my-6 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 '>
            <div className='border p-4 rounded-sm border-gray-300'>
                <h3 className='text-xl font-semibold text-center mb-4'>{user?.displayName}</h3>
                <ul tabIndex={0} className="dropdown-content menu w-full p-0 text-gray-900">
                    <li className='border-b border-gray-300'><NavLink to='/dashboard/my-orders' >My Orders</NavLink></li>
                    <li className=''><NavLink to='/profile'>Profile</NavLink></li>
                 
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