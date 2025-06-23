import React from 'react';
import Banner from '../../component/Banner/Banner';
import Categories from '../../component/Categories/Categories';
import BestSellers from '../../component/BestSellers/BestSellers';
import NewArrivals from '../../component/NewArrivals/NewArrivals';
import PrivateRoute from '../../PrivateRoute';
import useCategories from '../../hooks/useCategories';

const Home = () => {
    const [categories, isLoading, refetch] = useCategories();

    console.log(isLoading);
    return (
        <div>
           {
           isLoading === true ?
           <div className='min-h-[600px] w-full flex items-center justify-center'>
           <span className="loading loading-bars loading-md text-orange-600"></span>
           </div>
            : 
           <div>
             <Banner />
            <Categories />
            <BestSellers />
            <NewArrivals/>
           </div>
           }
        </div>
    );
};

export default Home;