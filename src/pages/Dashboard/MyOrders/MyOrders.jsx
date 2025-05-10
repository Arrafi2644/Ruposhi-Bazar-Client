import React from 'react';
import useMyOrders from '../../../hooks/useMyOrders';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, isLoading, refetch] = useMyOrders()
    console.log(orders);
    return (
        <div className='p-4'>
            <h2 className='mb-4 text-xl text-center font-semibold'>All Orders</h2>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
                {
                    orders.map(order => <Link className='' key={order._id}>
                        <div className='border border-gray-300 p-4 flex md:flex-row gap-2 font-medium'>
                            <img className='h-20 w-20 object-center object-cover' src={order?.product?.images[0]} alt="" />
                            <div>
                                <h3 className='font-semibold'>{order?.product?.title}</h3>
                                <div className=' text-xs md:text-sm flex flex-col md:flex-row'>
                                    <span className=''>Brand: {order?.product?.brand}</span>
                                    <span className=' ml-0 md:ml-4'>Qty: {order?.quantity}</span>
                                    <span className='ml-0 md:ml-4'>Total: {order?.totalPayableAmount}Tk</span>
                                </div>
                                <div className='mt-2 space-x-1'>
                                    
                                    <button className={`btn btn-xs ${order?.status === "new" ? "bg:bg-green-300" : "bg-red-700"}`}>{order?.status}</button>
                                     {/* <button className="btn btn-xs">View Order</button> */}
                                     <button className="btn btn-xs">Cancel Order</button>
                                </div>
                            </div>

                        </div>
                    </Link>)
                }
            </div>

        </div>
    );
};

export default MyOrders;