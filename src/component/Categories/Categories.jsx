// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router';
// import useCategories from '../../hooks/useCategories';

// const Categories = () => {
// const [categories, isLoading, refetch] = useCategories();

//     // console.log("Categories are ", categories);
//     return (
//         <div className='mt-6 bg-white '>
//             {/* section heading  */}
//             <div className=' pb-2 '>
//                 <h2 className='text-lg md:text-xl font-semibold'>Categories</h2>
//             </div>
//             {/* section content */}
//             <div className='flex flex-wrap gap-1 justify-between md:justify-start '>
//                 {
//                     categories.map(category => <Link to={`/all-products/${category?.name}`} state={category?.name} key={category._id} className=' p-2 w-28 md:w-32 flex items-center flex-col border hover:shadow-md hover:border border-gray-200 bg-white'>
//                         <img className='w-full h-20 object-cover' src={category.image} alt={category.name} />
//                         <h3 className='text-center mt-1'>{category.name}</h3>
//                     </Link>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default Categories;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useCategories from '../../hooks/useCategories';

const Categories = () => {
    const [categories, refetch, isLoading] = useCategories();

    // console.log("Categories are ", categories);
    return (
        <div className='mt-6 pt-6 px-1 md:px-4 bg-white '>
            {/* section heading  */}
            <div className=' pb-2 flex gap-4 justify-between items-center'>
                <h2 className='text-lg md:text-xl font-semibold'>Categories</h2>
                <Link to="/categories"><button className="btn btn-sm text-white bg-orange-600 hover:bg-orange-600">View All</button></Link>
            </div>
            {/* section content */}
            <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
                {
                    ...categories.slice(0, 8).map(category => <Link to={`/all-products/${category.name}`} state={category.name} key={category._id} className=' p-2 w-full flex items-center flex-col border hover:shadow-md hover:border border-gray-200 bg-white'>
                        <img className='w-full h-14 md:h-20 object-cover' src={category.image} alt={category.name} />
                        <h3 className='text-center text-sm mt-1'>{category.name}</h3>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default Categories;