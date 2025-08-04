import React, { useContext, useState } from 'react';
import { AiFillPauseCircle, AiOutlineHome } from 'react-icons/ai';
import { CiMenuFries, CiUser } from 'react-icons/ci';
import { IoCartOutline, IoEllipsisHorizontalCircleOutline, IoMenuSharp } from 'react-icons/io5';
import { MdCategory, MdOutlineAccountCircle, MdOutlineCategory } from 'react-icons/md';
import { PiStorefront, PiUserCircle } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import useAdmin from '../../hooks/useAdmin';
import useCarts from '../../hooks/useCarts';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext)
    const [isAdmin, adminPending, isLoading] = useAdmin()
    const navigate = useNavigate()
   const [carts, refetch] = useCarts();

    // console.log(user?.displayName);
    // const isAdmin = true;
    const handleLogout = () => {
        logoutUser();
        toast.success("Logout successful!")
    }

    const handleSearch = (value) => {
        // console.log(value);
        navigate('/all-products', { state: value })
    }

    return (
        <div className='sticky top-0 z-50 bg-orange-600 text-white shadow-sm'>

            <div className='sticky top-0 left-0 z-50'>
                {/* nav-1  */}
                <div className="navbar flex justify-between container mx-auto px-2 md:px-4">
                    <div className="navbar-start w-auto md:w-1/3">
                        <Link to={'/'} className="font-semibold text-xl  ">RuposheeBazar</Link>
                    </div>

                    {/* Search bar  */}
                    <div className="navbar-center w-auto lg:w-[500px] hidden md:block">
                        <label className="input min-h-0 h-auto py-1.5 w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input onChange={(e) => handleSearch(e.target.value)} type="search" className="grow text-gray-700" placeholder="Search here" />
                        </label>
                    </div>

                    <div className="navbar-end grow">
                        <ul className='menu menu-horizontal px-1 hidden md:flex items-center'>
                            {/* <li><Link ><AiOutlineHome size={20} />  <span className='hidden lg:block'>Home</span></Link></li> */}
                            <li><Link className='relative' to='/cart'> <span className='absolute top-0 right-0 w-4 h-4 flex items-center justify-center rounded-full bg-white text-orange-600 text-xs'>{carts?.length}</span> <IoCartOutline size={20} /></Link></li>
                            <li ><Link >Home</Link></li>
                            <li ><Link to='/all-products'>Products</Link></li>
                            <li className=''> {
                                user ?
                                    <div className="dropdown">
                                        <div tabIndex={0} className="text-right p-1.5 cursor-pointer rounded-md"><span className=' px-1 rounded-md flex '><PiUserCircle size={20} /> {user?.displayName?.split(" ")[0]}</span></div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 -right-1 pr-0 top-7 shadow-sm text-gray-900">

                                            <li className=''>
                                                {
                                                    isAdmin ? <Link to='/dashboard/manage-orders' >Dashboard</Link> : <Link to='/dashboard/my-orders' >Dashboard</Link>
                                                }
                                            </li>
                                            <li className=''><button onClick={handleLogout}>Logout</button></li>
                                        </ul>
                                    </div>
                                    : <Link to='/login'> Login</Link>
                            }
                            </li>

                        </ul>
                        <ul className='menu menu-horizontal px-1 flex md:hidden items-center '>
                            <li><Link className='relative' to='/cart'> <span className='absolute top-0 right-0 w-4 h-4 flex items-center justify-center rounded-full bg-white text-orange-600 text-xs'>{carts?.length}</span> <IoCartOutline size={20} /></Link></li>

                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="text-right p-1.5 hover:bg-base-300 cursor-pointer rounded-md"><IoMenuSharp size={20} /></div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 -right-1 pr-0 top-7 shadow-sm text-gray-900">
                                    <li className=''><Link to='/' >Home</Link></li>
                                    <li className=''><Link to='/all-products'>Products</Link></li>
                                    {/* <li className=''> {
                                        user ?
                                            <Link to='/'>{user?.displayNamename}</Link> : <Link to='/login'> Login</Link>
                                    } </li> */}
                                </ul>
                            </div>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="text-right p-1.5 hover:bg-base-300 cursor-pointer rounded-md">{user ? <span className='border-2 rounded-full h-6 w-6 flex items-center justify-center '>{user?.displayName.slice(0, 1)}</span> : < PiUserCircle size={20} />}</div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 -right-1 pr-0 top-7 shadow-sm text-gray-900">
                                    {
                                        user ?
                                            <div>
                                                {/* <li className=''><Link to='/dashboard/my-orders' >Dashboard</Link>
                                                </li> */}
                                                <li className=''>
                                                    {
                                                        isAdmin ? <Link to='/dashboard/manage-orders' >Dashboard</Link> : <Link to='/dashboard/my-orders' >Dashboard</Link>
                                                    }
                                                </li>
                                                <li className=''><button onClick={handleLogout}>Logout</button></li></div> :
                                            <li className=''><Link to='/login' >Login</Link></li>
                                    }
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>

                {/* nav-2  */}
                <div className="navbar shadow-sm md:hidden">
                    <div className="navbar-center w-full block -mt-5 md:hidden">
                        {/* Search bar  */}
                        <label className="input w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input onChange={(e) => handleSearch(e.target.value)} type="search" className="grow text-gray-700" placeholder="Search here" />

                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;