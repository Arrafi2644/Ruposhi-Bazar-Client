import React, { useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaCheck, FaThumbsUp, FaHandshake, FaTruck, FaPhoneAlt } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useCarts from '../../hooks/useCarts';

const ProductsDetails = () => {
    const location = useLocation();
    const product = location?.state;
    const [productImage, setProductImage] = useState(0)
    const [quantityCount, setQuantityCount] = useState(1);
    const [activeTab, setActiveTab] = useState("tab-1")
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [carts, refetch, isLoading] = useCarts()


    const tabs = [
        { id: 'tab-1', label: 'Product Details' },
        { id: 'tab-2', label: 'Reviews' },
        { id: 'tab-3', label: 'Shipping' },
    ]

    const handleAddToCart = (product) => {
        const cartItem = {
            userEmail: user.email,
            product: product,
            quantity: quantityCount
        }
        axiosSecure.post("/carts", cartItem)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Add to cart successfully!")
                    refetch();
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Something went wrong!")
            })
    }

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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-row-reverse'>
                    <img className='border border-gray-300 w-full h-auto object-cover object-center' src={product?.images[productImage]} alt="" />
                    <div className='flex gap-2 flex-col mr-2'>
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

                    </div>
                    <div className='flex gap-2'>
                        <Link to='/order-page' state={productInfo}>
                            <button className="btn bg-orange-600 text-gray-50">Order Now</button>
                        </Link>
                        <button onClick={() => handleAddToCart(product)} className="btn btn-outline border-gray-300"> <span><IoCartOutline size={18} /></span> Add To Cart</button>
                        <button className="btn btn-outline border-gray-300"><BiHeart size={22} /></button>
                    </div>
                </div>

            </div>


            {/* Product details  */}
            <div role="tablist" className="tabs tabs-lift mt-8 border-gray-300">
                {
                    tabs.map(tab => <a key={tab.id} onClick={() => setActiveTab(tab.id)} role="tab" className={`tab ${activeTab === tab.id && "tab-active"} border-gray-300`}>{tab.label}</a>)
                }
            </div>
            {/* Tab panels */}
            <div className="mt-0">
                {/* Panel 1 */}
                <div
                    id="tab-1"
                    role="tabpanel"
                    className={`${activeTab !== 'tab-1' ? 'hidden' : ''} p-4 border border-t-0 border-gray-300`}
                >
                    <h2 className="text-xl md:text-2xl font-semibold">
                        Product details for {product?.title}
                    </h2>
                    <p>Type: {product?.title}</p>
                    <p>Brand: {product?.brand}</p>
                    <p>
                        Colors:{' '}
                        {product?.colors?.map((c, i) => (
                            <span key={i}>{c}{i < product.colors.length - 1 && ', '}</span>
                        ))}
                    </p>

                    {product?.specification ? (
                        <div>
                            <p>Specifications:</p>
                            <ul className="list-disc pl-5">
                                {product.specification.split(',').map((s, i) => (
                                    <li key={i}>{s.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No specifications available.</p>
                    )}

                    {product?.features ? (
                        <div>
                            <p>Features:</p>
                            <ul className="list-disc pl-5">
                                {/* {product?.features?.split(',')?.map((f, i) => (
                                    <li key={i}>{f.trim()}</li>
                                ))} */}
                            </ul>
                        </div>
                    ) : (
                        <p>No features available.</p>
                    )}

                    <p>Description: {product?.description}</p>
                </div>

                {/* Panel 2 */}
                <div
                    id="tab-2"
                    role="tabpanel"
                    className={activeTab !== 'tab-2' ? 'hidden' : ''}
                >
                    {/* Replace with your reviews content */}
                    <div className='p-4 border border-gray-300 border-t-0'>
                        <p>Customer reviews go here…</p>
                    </div>
                </div>

                {/* Panel 3 */}
                <div
                    id="tab-3"
                    role="tabpanel"
                    className={activeTab !== 'tab-3' ? 'hidden' : ''}
                >
                    {/* Delivery info  */}
                    <div>
                        {/* Delivery Information */}
                        <div className="border border-gray-300 border-t-0 p-4 space-y-2">
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
                        <div className="border border-gray-300 mt-4 p-4 space-y-1">
                            <p>Have question about this product? please call</p>
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-orange-600" />
                                <span className="text-orange-600 font-medium">01751166818</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductsDetails;