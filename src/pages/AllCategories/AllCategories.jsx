import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useCategories from '../../hooks/useCategories';

const AllCategories = () => {
    const [categories, refetch, isLoading] = useCategories();

    // console.log("Categories are ", categories);
    return (
        <div className='mt-6 pt-6 px-1 md:px-4 bg-white '>
            {/* section heading  */}
            <div className=' pb-2 '>
                <h2 className='text-lg md:text-xl font-semibold'>All Categories</h2>
            </div>
            {/* section content */}
            <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9'>
                {
                    categories.map(category => <Link to={`/all-products/${category.name}`} state={category.name} key={category._id} className=' p-2 w-full flex items-center flex-col border hover:shadow-md hover:border border-gray-200 bg-white'>
                        <img className='w-full h-14 md:h-20 object-cover' src={category.image} alt={category.name} />
                        <h3 className='text-center text-sm mt-1'>{category.name}</h3>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default AllCategories;