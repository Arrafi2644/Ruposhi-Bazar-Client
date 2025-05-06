import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import SectionSlider from '../SectionSlider/SectionSlider';

const NewArrivals = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("products.json")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error))
    }, [])

    const newProducts = [...products].reverse().slice(0, 15)
    console.log(products);

    // console.log("Categories are ", categories);
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
                <h2 className='text-lg md:text-xl pb-4 font-semibold '>New Arrivals</h2>

                {/* Section content  */}
                {/* <SectionProducts products={featuredProducts}/> */}

                {/* with slider  */}
                <SectionSlider products={newProducts} />
            </div>
        </div>
    );
};

export default NewArrivals;