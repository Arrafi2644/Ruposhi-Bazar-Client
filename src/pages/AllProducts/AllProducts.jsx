import React, { useEffect, useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';

const AllProducts = () => {
    const location = useLocation();
    const category = location?.state || location?.pathname?.split("/")[2]
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1)
    const [products, isLoading, refetch] = useProducts({ category })
    //   console.log(location.pathname.split("/")[2]);
    console.log("current page", currentPage);

    return (
        <div className='my-6'>
            <h2 className='text-lg md:text-xl pb-4 font-semibold '>Total Products ({products?.length})</h2>

            {
                isLoading ? <div>
                    <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                </div> :
                    (products?.length < 1 ?
                        <h3 className='text-xl font-semibold text-center mt-10'>Product not available now. Please try latter.</h3>
                        :
                        <div>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>

                                {products.map((product) => (
                                    <div key={product?._id} className="h-full">
                                        <Link
                                            className="flex flex-col h-full border border-gray-200 p-2 hover:shadow-md"
                                            to={`/product/${product?._id}`} state={product} // Adjust the route as needed
                                        >
                                            <img
                                                className="h-48 w-full object-cover"
                                                src={product?.images[0]}
                                                alt={product?.name}
                                            />
                                            <div className="flex flex-col flex-grow mt-2">
                                                <h3 className="font-medium text-sm truncate">{product?.title}</h3>
                                                <div className="flex items-center">
                                                    <TbCurrencyTaka />
                                                    <h3>{product?.price - parseInt(product.price * product?.discount / 100)}</h3>
                                                </div>
                                                <h3 className="flex items-center gap-0.5">
                                                    <del className="flex items-center text-gray-400">
                                                        <TbCurrencyTaka />
                                                        {product?.price}
                                                    </del>
                                                    -{product?.discount}%
                                                </h3>
                                                <button className="btn text-gray-100 bg-orange-600">Order Now</button>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            {/* pagination  */}
                            {/* <button onClick={(e)=> setCurrentPage(1)} className="btn">1</button>
                            <button onClick={(e)=> setCurrentPage(2)} className="btn">2</button>
                            <button onClick={(e)=> setCurrentPage(3)} className="btn">3</button> */}
                        </div>

                    )

            }

        </div>
    );
};

export default AllProducts;