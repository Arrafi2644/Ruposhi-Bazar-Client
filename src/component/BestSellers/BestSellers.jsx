import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import SectionSlider from '../SectionSlider/SectionSlider';

const BestSellers = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("products.json")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error))
    }, [])

    // console.log(products);
    const bestSellingProducts =[...products].sort((a, b)=> {
        return b.total_sells - a.total_sells
    }).slice(0, 15)

    console.log("best selling products", bestSellingProducts);

    return (
        <div className='mt-6 bg-white '>
        
            {/* section content */}
            {/* <div className='flex flex-wrap gap-2 '>
                {
                    products.map(product => <Link  key={product._id} className=' p-2 w-32 flex items-center flex-col border hover:shadow-md hover:border border-gray-200 bg-white'>
                        <img className='w-full h-20 object-cover' src={product.image} alt={product.name} />
                        <h3 className='text-center mt-1'>{product.name}</h3>
                    </Link>)
                }
            </div> */}
            <div className='mt-6 bg-white py-6'>
            {/* Section heading  */}
            {/* <SectionHeader title={"Featured"} /> */}
            <h2 className='text-lg md:text-xl pb-4 font-semibold '>Best Sellers</h2>

            {/* Section content  */}
            {/* <SectionProducts products={featuredProducts}/> */}

            {/* with slider  */}
            <SectionSlider products={bestSellingProducts} />
        </div>
        </div>
    );
};

export default BestSellers;