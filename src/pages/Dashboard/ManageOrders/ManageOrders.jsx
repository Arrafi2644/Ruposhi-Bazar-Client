import React from 'react';
import useAllOrders from '../../../hooks/useAllOrders';
import { BiDotsVertical } from 'react-icons/bi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageOrders = () => {
    const [allOrders, isLoading, refetch] = useAllOrders();
    const axiosSecure = useAxiosSecure();
    console.log(allOrders);

    const handleProcessingOrder = (_id) => {
        console.log("processing order ", _id);
        const updatedStatus = "Processing"
        axiosSecure.patch(`/orders/${_id}`, { updatedStatus })
            .then(res => {
                // console.log(res);
                if (res?.data?.modifiedCount > 0) {
                    // console.log(totalPriceRefetch);
                    toast.success("Order processing now!")
                    refetch()

                }

            })
            .catch(err => {
                // console.log(err);
                toast.error("Something went wrong!")
            })
    }

    const handleDeliveredOrder = (_id) => {
        console.log("delivered order ", _id);
        const updatedStatus = "Delivered"
        axiosSecure.patch(`/orders/${_id}`, { updatedStatus })
            .then(res => {
                // console.log(res);
                if (res?.data?.modifiedCount > 0) {
                    // console.log(totalPriceRefetch);
                    toast.success("Order Delivered!")
                    refetch()
                }

            })
            .catch(err => {
                // console.log(err);
                toast.error("Something went wrong!")
            })
    }

    return (
        <div>
            <h2 className='mb-4 text-xl text-center font-semibold'>Manage Orders</h2>

            {
                isLoading ?
                    <div><span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span></div>
                    :
                    <div className='mt-6'>
                        <div className="overflow-x-auto">
                            <table className="table font-medium">
                                {/* head */}
                                <thead>
                                    <tr className='border border-gray-300'>
                                        <th>Order Id</th>
                                        <th>Product</th>
                                        <th>Date</th>
                                        <th>Customer Name</th>
                                        <th>Phone</th>
                                        <th>Location</th>
                                        <th>Amount</th>
                                        <th>Order Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='border border-gray-300 text-xs xl:text-sm'>

                                    {
                                        allOrders.slice().reverse().map((order, index) => <tr className='border-b border-gray-300 justify-start' key={order._id}>
                                            <td>{order?._id.slice(-5)}</td>
                                            <td>{order?.product?.title || "N/A"} </td>
                                            <td>{order?.orderDate || "N/A"}</td>
                                            <td>{order?.customerName || "N/A"}</td>
                                            <td>{order?.customerPhone || "N/A"}</td>
                                            <td>{order?.address || "N/A"}</td>
                                            <td>{order.totalPayableAmount} Tk</td>
                                            <td>
                                                <span
                                                    className={`px-2 py-[2px] rounded-md ${order?.status === "New"
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
                                                </span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`dropdown ${order?.status === "Canceled" || order?.status === "Delivered" ? "pointer-events-none opacity-50" : ""}`}
                                                >
                                                    <div tabIndex={0} className="text-right p-1.5 cursor-pointer rounded-md"><span className=' px-1 rounded-md flex '><BiDotsVertical size={20} /></span></div>
                                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 -right-1 pr-0 top-7 shadow-sm text-gray-900">
                                                        {
                                                            order?.status === "Processing" && <li className=''><button onClick={() => handleDeliveredOrder(order?._id)}>Delivered</button></li>
                                                        }
                                                        {
                                                            order?.status === "New" && <li className=''><button onClick={() => handleProcessingOrder(order._id)}>Processing</button></li>
                                                        }

                                                    </ul>
                                                </div>
                                            </td>

                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
            }


        </div>
    );
};

export default ManageOrders;