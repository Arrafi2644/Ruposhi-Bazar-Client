import React from 'react';
import bannerImage from "../../assets/images/banner-1.jpg"

const Banner = () => {
    return (
        <div>
            <div className='w-full mt-4 relative'>
                <img className='max-h-[400px] w-full h-full object-cover' src={bannerImage} alt="Banner image" />
                <div className="text-center space-y-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className='text-2xl font-semibold'>Welcome to RuposheeBazar</h2>
                    <h3>Your One-Stop Online Shop for Everyday Essentials</h3>
                    <button className="btn bg-yellow-900 text-gray-200">Shop Now</button>
                </div>
            </div>
        </div>

    );
};

export default Banner;