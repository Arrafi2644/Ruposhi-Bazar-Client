import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { CiMenuFries } from 'react-icons/ci';
import { IoCartOutline, IoMenuSharp } from 'react-icons/io5';
import { MdCategory, MdOutlineAccountCircle, MdOutlineCategory } from 'react-icons/md';
import { PiStorefront } from 'react-icons/pi';
import { Link } from 'react-router';

const Navbar = () => {
    return (
    <div className='sticky top-0 z-50 bg-yellow-900 text-white shadow-sm'>

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
                            <input type="search" className="grow text-gray-700" placeholder="Search here" />
                        </label>
                    </div>

                    <div className="navbar-end grow">
                        <ul className='menu menu-horizontal px-1 hidden md:flex items-center'>
                            {/* <li><Link ><AiOutlineHome size={20} />  <span className='hidden lg:block'>Home</span></Link></li> */}
                            <li><Link ><IoCartOutline size={20} /></Link></li>
                            <li ><Link >Home</Link></li>
                            <li ><Link >All Products</Link></li>
                            <li ><Link >Login</Link></li>
                        </ul>
                        <ul className='menu menu-horizontal px-1 flex md:hidden items-center '>
                            <li><Link ><IoCartOutline size={24} />  <span className='hidden lg:block'>Cart</span></Link></li>

                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="text-right p-1.5 hover:bg-base-300 cursor-pointer rounded-md"><IoMenuSharp size={20} /></div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 -right-1 pr-0 top-7 shadow-sm text-gray-900">
                                    <li className=''><Link >Home</Link></li>
                                    <li className=''><Link >All Products</Link></li>
                                    <li className=''><Link > Login</Link></li>
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
                            <input type="search" className="grow text-gray-700" placeholder="Search here" />

                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;