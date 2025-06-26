import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Link from 'daisyui/components/link';
import { NavLink, Outlet } from 'react-router-dom';
import "./dashboard.css"
import useAdmin from '../../hooks/useAdmin';
import { RiMenuFold2Fill, RiMenuFoldFill } from "react-icons/ri";


const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin, adminPending, isLoading] = useAdmin()
    const [showMenu, setShowMenu] = useState(false)

    // User routes 
    const userRoutes = <>
        <li onClick={() => setShowMenu(!showMenu)} className=' border-gray-300 border rounded-md'><NavLink to='/dashboard/my-orders' >My Orders</NavLink></li>
        {/* <li className='border-b border-gray-300 bottom-0'><NavLink to={"/"}>Profile</NavLink></li> */}
    </>

    // Admin routes
    const adminRoutes = <>
        <li onClick={() => setShowMenu(!showMenu)} className=' border-gray-300 border rounded-md'><NavLink to='/dashboard/manage-orders' >Manage Orders</NavLink></li>
        <li onClick={() => setShowMenu(!showMenu)} className=' border-gray-300 border rounded-md'><NavLink to='/dashboard/manage-users' >Manage Users</NavLink></li>
        <li onClick={() => setShowMenu(!showMenu)} className=' border-gray-300 border rounded-md'><NavLink to='/dashboard/manage-products' >Manage Products</NavLink></li>
        <li onClick={() => setShowMenu(!showMenu)} className=' border-gray-300 border rounded-md'><NavLink to='/dashboard/add-product' >Add Product</NavLink></li>
        <li onClick={() => setShowMenu(!showMenu)} className=' border-gray-300 border rounded-md'><NavLink to='/dashboard/manage-category' >Manage Category</NavLink></li>
        <li onClick={() => setShowMenu(!showMenu)} className=' border-gray-300 border rounded-md'><NavLink to='/dashboard/add-category' >Add Category</NavLink></li>
    </>
    return (
        <div className='my-6 min-h-[500px] grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 '>
            <div className='border hidden lg:block p-4 rounded-sm border-gray-300 bg-orange-600 text-white'>
                <h3 className='text-xl font-semibold text-center mb-4'>{user?.displayName}</h3>
                <ul tabIndex={0} className="dropdown-content menu w-full p-0 gap-1">
                    {

                        isLoading ?
                            <div><span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 accent-orange-600 text-orange-600"></span></div>
                            :
                            isAdmin ? adminRoutes : userRoutes
                    }

                </ul>
            </div>
            <div className='relative col-span-1 lg:col-span-2 xl:col-span-3'>
                <div className={`absolute z-10 lg:hidden h-full top-0 border-gray-300 ${showMenu ? 'left-0' : "-left-48 md:-left-56"} transition-all duration-200 flex flex-row-reverse`} >
                    <button onClick={() => setShowMenu(!showMenu)} className="btn">{showMenu ? <RiMenuFoldFill /> : <RiMenuFold2Fill /> }  </button>
                    <div className='border w-48 md:w-56 p-2.5 rounded-sm border-gray-300 bg-orange-600 text-white'>
                        <h3 className='text-xl font-semibold text-center mb-4'>{user?.displayName}</h3>
                        <ul tabIndex={0} className="dropdown-content menu w-full p-0 gap-1 text-sm">
                            {

                                isLoading ?
                                    <div><span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 accent-orange-600 text-orange-600"></span></div>
                                    :
                                    isAdmin ? adminRoutes : userRoutes
                            }

                        </ul>
                    </div>

                </div>
                <div className=' border border-gray-300 p-2 rounded-sm'>
                    <Outlet>

                    </Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;