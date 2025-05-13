import React, { useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { FaCheck, FaThumbsUp, FaHandshake, FaTruck, FaPhoneAlt } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';

const ProductsDetails = () => {
    const location = useLocation();
    const product = location?.state;
    const [productImage, setProductImage] = useState(0)
    const [quantityCount, setQuantityCount] = useState(1);

    const handleDecrease = () => {
        if (quantityCount > 1) {
            setQuantityCount(prev => prev - 1);
        }
    };

    const handleIncrease = () => {
        setQuantityCount(prev => prev + 1);
    };

    const productInfo = {
        product,
        quantity: quantityCount

    }
    return (
        <div className='mt-6 font-medium '>
            <div className='flex items-center flex-wrap gap-1 mb-4'>
                <Link to="/">Home </Link>
                <span><IoIosArrowForward></IoIosArrowForward> </span>
                <Link to={"/all-products"} state={product?.category}>{product?.category}</Link>
                <span><IoIosArrowForward></IoIosArrowForward> </span>
                <Link to={"/all-products"} state={product?.productName}>{product?.productName}</Link>
                <span><IoIosArrowForward></IoIosArrowForward> </span>
                <span >{product?.model}</span>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className=''>
                    <img className='border border-gray-300 w-full max-h-[400px] h-auto object-cover object-center' src={product?.images[productImage]} alt="" />
                    <div className='flex gap-2 mt-2'>
                        {
                            product?.images.map((image, index) => <div key={index} className="cursor-pointer border border-gray-300 hover:border-yellow-900 w-20 h-20" onClick={() => setProductImage(index)} >
                                <img className='h-20 w-20' src={image} alt="" />
                            </div>)
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-4 mt-0'>
                    <h2 className='font-semibold text-xl'>{product?.title}</h2>
                    {/* review  */}
                    <div className='flex gap-1 items-center'>
                        <div className="rating rating-xs">
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="1 star" checked />
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="2 star" checked />
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="3 star" checked />
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="4 star" checked />
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" aria-label="5 star" checked />
                        </div>
                        <span>(0)</span>
                    </div>

                    <h3>Brand: {product?.brand}</h3>
                    <h3>Price: <del>{product?.price}</del> {parseInt(product?.price - (product?.price * product?.discount) / 100)} Tk</h3>
                    <div className='flex justify-between w-full gap-4'>
                        <div className='flex items-center gap-2 justify-between'>
                            <span className='font-medium'>Qty:</span>
                            <div className="inline-flex items-center border border-gray-300 px-4 py-2 rounded-md">
                                <button
                                    onClick={handleDecrease}
                                    className="text-base px-2 text-gray-500 cursor-pointer hover:text-black"
                                >
                                    −
                                </button>
                                <span className="px-4 text-base font-medium">{quantityCount}</span>
                                <button
                                    onClick={handleIncrease}
                                    className="text-base px-2 text-gray-500 cursor-pointer hover:text-black"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        {/* <button className="btn btn-outline border-gray-300"> <span><IoCartOutline size={18} /></span> Add To Cart</button> */}
                        {/* <button className="btn btn-outline border-gray-300"><BiHeart size={22} /></button> */}
                    </div>
                    <Link to='/order-page' state={productInfo}>
                        <button className="btn bg-yellow-900 text-gray-50 w-full">Order Now</button>
                    </Link>
                </div>
                {/* Delivery info  */}
                <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
                    {/* Delivery Information */}
                    <div className="border border-dotted border-yellow-900 p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <FaCheck className="text-black" />
                            <p>Order today and receive it within 03 - 05 days</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaThumbsUp className="text-black" />
                            <p>Quality Product</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaHandshake className="text-black" />
                            <p>Cash On Delivery Available</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTruck className="text-black" />
                            <p>Delivery Charge Inside Dhaka 80 TK</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTruck className="text-black" />
                            <p>Delivery Charge Outside Dhaka 120 TK</p>
                        </div>

                    </div>

                    {/* Contact Section */}
                    <div className="border border-dotted border-yellow-900 p-4 space-y-1">
                        <p>Have question about this product? please call</p>
                        <div className="flex items-center gap-2">
                            <FaPhoneAlt className="text-yellow-900" />
                            <span className="text-yellow-900 font-medium">+8801990-835127</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product details  */}
            <div className='mt-6'>
                <h2 className='text-xl md:text-2xl font-semibold'>Product details for {product?.title}</h2>
                <p>Product Type: {product?.title}</p>
                <p>Brand: {product?.brand}</p>
                <p>Colors: {product?.colors?.map((color, index) => <span className='' key={index}>{color}, </span>)}</p>
                {/* <p>Features: {product?.features?.map(color => <span>{color}, </span>)}</p> */}


                {product?.specification && typeof product?.specification === "string" ? (
                    <div>
                        <p>Specifications:</p>
                        <ul className="list-disc pl-5 font-normal">
                            {product.specification
                                .split(",")
                                .map((spec, index) => (
                                    <li key={index}>{spec.trim()}</li>
                                ))}
                        </ul>
                    </div>
                ) : (
                    <p>No specifications available.</p>
                )}




                {product?.features && typeof product?.features === "string" ? (
                    <div>
                        <p>Features:</p>
                        <ul className="list-disc pl-5 font-normal">
                            {product.features
                                .split(",")
                                .map((feature, index) => (
                                    <li key={index}>{feature.trim()}</li>
                                ))}
                        </ul>
                    </div>
                ) : (
                    <p>No features available.</p>
                )}



                <p>Description: {product?.description}</p>
            </div>
        </div>

    );
};

export default ProductsDetails;