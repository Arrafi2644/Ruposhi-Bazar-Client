import React from 'react';
import useMyOrders from '../../../hooks/useMyOrders';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const [orders, isLoading, refetch] = useMyOrders();
    const axiosSecure = useAxiosSecure();

    const handleCancelOrder = (_id) => {
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
                        if (res?.data?.modifiedCount > 0) {
                            Swal.fire({
                                title: "Canceled!",
                                text: "Order canceled.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong! Try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className=''>
            <h2 className='mb-4 text-xl text-center font-semibold'>All Orders</h2>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
                {
                    isLoading ?
                        <div>
                            <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                        </div>
                        :
                        orders?.length > 0 ? (
                            orders?.slice().reverse().map(order => (
                                <div key={order?._id} className='border border-gray-300 p-2 flex flex-col gap-2 font-medium'>
                                    <h3 className='text-md font-semibold text-gray-800'>Order ID: {order?._id?.slice(-5)}</h3>
                                    <p className='text-sm'>Order Date: {order?.orderDate}</p>

                                    <div className='flex flex-col gap-2'>
                                        {order?.products?.map(item => (
                                            <div key={item?._id} className='flex gap-2 items-start border p-2 rounded-md'>
                                                <img className='h-20 w-20 object-cover rounded' src={item?.product?.images?.[0]} alt={item?.product?.title} />
                                                <div className='flex flex-col gap-1'>
                                                    <h4 className='font-semibold'>{item?.product?.title}</h4>
                                                    <p className='text-sm'>Brand: {item?.product?.brand}</p>
                                                    <p className='text-sm'>Quantity: {item?.quantity}</p>
                                                    <p className='text-sm'>Price: {item?.product?.price} Tk</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='mt-2 text-sm'>
                                        <p>Delivery Charge: <strong>{order?.deliveryCharge} Tk</strong></p>
                                        <p>Discount: <strong>{order?.discountAmount} Tk</strong></p>
                                        <p>Total Payable: <strong>{order?.totalPayableAmount} Tk</strong></p>
                                    </div>

                                    <div className='mt-2 flex flex-wrap items-center gap-2'>
                                        <button
                                            className={`btn btn-xs rounded-md border-none ${
                                                order?.status === "New"
                                                    ? "bg-green-500"
                                                    : order?.status === "Processing"
                                                        ? "bg-orange-600"
                                                        : order?.status === "Delivered"
                                                            ? "bg-blue-500"
                                                            : order?.status === "Canceled"
                                                                ? "bg-red-700"
                                                                : "bg-gray-500"
                                            } text-white`}
                                        >
                                            {order?.status}
                                        </button>

                                        {(order?.status === "New" || order?.status === "Processing") && (
                                            <button onClick={() => handleCancelOrder(order?._id)} className="btn btn-xs bg-red-500 text-white">
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2 className="text-center font-semibold col-span-1 xl:col-span-2">No orders yet</h2>
                        )
                }
            </div>
        </div>
    );
};

export default MyOrders;
