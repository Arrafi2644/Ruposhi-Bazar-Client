import React from 'react';
import useProducts from '../../../hooks/useProducts';
import { BiDotsVertical } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageProducts = () => {
    const [products, isLoading, refetch] = useProducts([])
    // console.log(products);
    const axiosSecure = useAxiosSecure();
    const handleStock = (_id) => {
        const updatedStockStatus = false;
        axiosSecure.patch(`/products/${_id}`, { updatedStockStatus })
            .then(res => {
                // console.log(res);
                if (res?.data?.modifiedCount > 0) {
                    // console.log(totalPriceRefetch);
                    toast.success("Stock status changed successfully!")
                    refetch()
                }

            })
            .catch(err => {
                // console.log(err);
                toast.error("Something went wrong!")
            })
    }

      const handleStockOut = (_id) => {
        const updatedStockStatus = true;
        axiosSecure.patch(`/products/${_id}`, { updatedStockStatus })
            .then(res => {
                // console.log(res);
                if (res?.data?.modifiedCount > 0) {
                    // console.log(totalPriceRefetch);
                    toast.success("Stock status changed successfully!")
                    refetch()
                }

            })
            .catch(err => {
                // console.log(err);
                toast.error("Something went wrong!")
            })
    }

    const handleDeleteProduct = (_id) => {
        // console.log(user);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/products/${_id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "This product has been deleted.",
                                icon: "success"
                            });
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
        <div>
            <h2 className='mb-4 text-xl text-center font-semibold'>Manage Products</h2>

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
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='border border-gray-300 text-xs xl:text-sm'>

                            {
                                products.slice().reverse().map((product, index) => <tr className='border-b border-gray-300 justify-start' key={product._id}>
                                    <td>{product?._id.slice(-5)}</td>
                                    <td>{product?.title || "N/A"} </td>
                                    <td>{product?.brand || "N/A"}</td>
                                    <td>{product?.price || "N/A"} Tk</td>
                                    <td>{product?.discount || "N/A"}%</td>
                                    <td>{product?.isStock ? "Stock" : "Out of stock"}</td>
                                    <td>
                                        <div
                                            className={`dropdown `}
                                        >
                                            <div tabIndex={0} className="text-right p-1.5 cursor-pointer rounded-md"><span className=' px-1 rounded-md flex '><BiDotsVertical size={20} /></span></div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 -right-1 pr-0 top-7 shadow-sm text-gray-900">
                                                {/* {
                                                    product?.status === "Processing" && <li className=''><button onClick={() => handleDeliveredOrder(order?._id)}>Delivered</button></li>
                                                }
                                                {
                                                    order?.status === "New" && <li className=''><button onClick={() => handleProcessingOrder(order._id)}>Processing</button></li>
                                                    } */}
                                                <li className=''><Link to={'/dashboard/update-product'} state={{ product, id: product._id }}><button>Update</button></Link></li>
                                                <li className=''><button onClick={() => handleDeleteProduct(product?._id)}>Delete</button></li>
                                                <li className=''>
                                                    {
                                                        product?.isStock ?
                                                        <button onClick={() => handleStock(product?._id)}>Stock Out</button>
                                                       : <button onClick={() => handleStockOut(product?._id)}>Stock</button>
                                                         
                                                    }
                                                </li>

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

export default ManageProducts;