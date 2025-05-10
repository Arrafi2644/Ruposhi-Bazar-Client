import React from 'react';
import Banner from '../../component/Banner/Banner';
import Categories from '../../component/Categories/Categories';
import BestSellers from '../../component/BestSellers/BestSellers';
import NewArrivals from '../../component/NewArrivals/NewArrivals';
import PrivateRoute from '../../PrivateRoute';

const Home = () => {
    return (
        <div>
            <Banner />
            <Categories />
            <BestSellers />
            <NewArrivals/>
        </div>
    );
};

export default Home;