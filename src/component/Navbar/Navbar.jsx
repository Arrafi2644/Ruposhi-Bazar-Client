import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { PiStorefront} from 'react-icons/pi';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div className=''>
      {/* nav-1  */}
      <div className="navbar justify-between container mx-auto px-2">
        <div className="navbar-start w-auto md:w-1/3">
          <Link to={'/'} className="font-semibold text-xl ">QuickMart</Link>
        </div>

        {/* Search bar  */}
        <div className="navbar-center w-52 md:w-96 xl:w-[500px] hidden md:block">
          <label className="input w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input type="search" className="grow text-gray-700" placeholder="Search here" />

          </label>
        </div>

        <div className="navbar-end grow">
          <ul className='menu menu-horizontal px-1 flex items-center'>
            <li><Link ><IoCartOutline size={20} />  <span className='hidden lg:block'>Cart</span></Link></li>
            <li><Link > <PiStorefront size={20} /> <span className='hidden lg:block'>Become a Seller</span></Link></li>
            <li><Link > <MdOutlineAccountCircle size={20} /> Login</Link></li>
          </ul>
        </div>
      </div>

      {/* nav-2  */}
      <div className="navbar shadow-sm md:hidden">
        <div className="navbar-center w-full block md:hidden">
          {/* Search bar  */}
          <label className="input w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input type="search" className="grow text-gray-700" placeholder="Search here" />

          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;