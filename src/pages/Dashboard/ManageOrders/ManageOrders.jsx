import React from 'react';
import useAllOrders from '../../../hooks/useAllOrders';
import { BiDotsVertical } from 'react-icons/bi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageOrders = () => {
    const [allOrders, isLoading, refetch] = useAllOrders();
    const axiosSecure = useAxiosSecure();

    const handleUpdateStatus = (_id, status) => {
        axiosSecure.patch(`/orders/${_id}`, { updatedStatus: status })
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    toast.success(`Order ${status}`);
                    refetch();
                }
            })
            .catch(() => {
                toast.error("Something went wrong!");
            });
    };

    return (
        <div>
            <h2 className='mb-4 text-xl text-center font-semibold'>Manage Orders</h2>

            {isLoading ? (
                <div>
                    <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                </div>
            ) : (
                <div className='mt-6'>
                    <div className="overflow-x-auto">
                        <table className="table font-medium">
                            <thead>
                                <tr className='border border-gray-300 text-sm'>
                                    <th>Order ID</th>
                                    <th>Products</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='border border-gray-300 text-xs xl:text-sm'>
                                {allOrders.slice().reverse().map(order => {
                                    const firstProduct = order.products?.[0]?.product;
                                    return (
                                        <tr key={order._id} className='border-b border-gray-300'>
                                            <td>{order._id.slice(-5)}</td>
                                            <td>
                                                {firstProduct?.title || 'N/A'}
                                                {order.products?.length > 1 && (
                                                    <span className="ml-1 text-xs text-gray-500">
                                                        +{order.products.length - 1} more
                                                    </span>
                                                )}
                                            </td>
                                            <td>{order.orderDate || 'N/A'}</td>
                                            <td>{order.customerName || 'N/A'}</td>
                                            <td>{order.customerPhone || 'N/A'}</td>
                                            <td>{order.address || 'N/A'}</td>
                                            <td>{order.totalPayableAmount} Tk</td>
                                            <td>
                                                <span
                                                    className={`px-2 py-[2px] rounded-md ${
                                                        order.status === "New"
                                                            ? "bg-green-500"
                                                            : order.status === "Processing"
                                                            ? "bg-orange-600"
                                                            : order.status === "Delivered"
                                                            ? "bg-blue-500"
                                                            : order.status === "Canceled"
                                                            ? "bg-red-700"
                                                            : "bg-gray-500"
                                                    } text-white`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div
                                                    className={`dropdown ${["Delivered", "Canceled"].includes(order.status) ? "pointer-events-none opacity-50" : ""}`}
                                                >
                                                    <div tabIndex={0} className="p-1.5 cursor-pointer rounded-md">
                                                        <span className='flex items-center justify-center'><BiDotsVertical size={20} /></span>
                                                    </div>
                                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-36 -right-1 top-7 shadow-sm text-gray-900">
                                                        {order.status === "New" && (
                                                            <li><button onClick={() => handleUpdateStatus(order._id, "Processing")}>Mark Processing</button></li>
                                                        )}
                                                        {order.status === "Processing" && (
                                                            <li><button onClick={() => handleUpdateStatus(order._id, "Delivered")}>Mark Delivered</button></li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
