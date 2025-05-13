import React from 'react';
import useMyOrders from '../../../hooks/useMyOrders';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const [orders, isLoading, refetch] = useMyOrders();
    const axiosSecure = useAxiosSecure();

    const handleCancelOrder = (_id) => {
        console.log("cancel order ", _id);

        const updatedStatus = "Canceled";

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/orders/${_id}`, { updatedStatus })
                    .then(res => {
                        // console.log(res);
                        if (res?.data?.modifiedCount > 0) {
                            // console.log(totalPriceRefetch);

                            Swal.fire({
                                title: "Canceled!",
                                text: "Order canceled.",
                                icon: "success"
                            });
                            refetch()

                        }

                    })
                    .catch(err => {
                        // console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong! Try again.",
                            icon: "error"
                        });
                    })
            }
        });
    }


    return (
        <div className=''>
            <h2 className='mb-4 text-xl text-center font-semibold'>All Orders</h2>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
                {
                   isLoading ? 
              <div><span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span></div>
              :

                    orders.length > 0 ? (
                        orders.slice().reverse().map(order => (<Link className='' key={order._id}>
                            <div className='border border-gray-300 p-2 flex md:flex-row gap-2 font-medium'>
                                <img className='h-20 w-20 object-center object-cover' src={order?.product?.images[0]} alt="" />
                                <div>
                                    <h3 className='font-semibold'>{order?.product?.title}</h3>
                                    <div className=' text-xs md:text-sm flex flex-col md:flex-row'>
                                        <span className=''>Brand: {order?.product?.brand}</span>
                                        <span className=' ml-0 md:ml-4'>Qty: {order?.quantity}</span>
                                        <span className='ml-0 md:ml-4'>Total: {order?.totalPayableAmount}Tk</span>
                                    </div>
                                    <div className='mt-2 space-x-1'>

                                        <button
                                            className={`btn btn-xs cursor-default rounded-md border-none ${order?.status === "New"
                                                ? "bg-green-500 text-white"
                                                : order?.status === "Processing"
                                                    ? "bg-yellow-900 text-white"
                                                    : order?.status === "Delivered"
                                                        ? "bg-blue-500 text-white"
                                                        : order?.status === "Canceled"
                                                            ? "bg-red-700 text-white"
                                                            : "bg-gray-500 text-white"
                                                }`}
                                        >
                                            {order?.status}
                                        </button>

                                        {/* <button className="btn btn-xs">View Order</button> */}
                                        {(order?.status === "New" || order?.status === "Processing") && <button onClick={() => handleCancelOrder(order?._id)} className="btn btn-xs">Cancel Order</button>}
                                    </div>
                                </div>

                            </div>
                        </Link>))
                    )
                        : (<h2 className="text-center font-semibold col-span-1 xl:col-span-2">No ordered yet</h2>)
                }
            </div>

        </div>
    );
};

export default MyOrders;