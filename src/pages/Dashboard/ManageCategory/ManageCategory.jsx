import React from 'react';
import useProducts from '../../../hooks/useProducts';
import { BiDotsVertical } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useCategories from '../../../hooks/useCategories';

const ManageCategory = () => {
    const [categories, isLoading, refetch] = useCategories()

    return (
        <div>
            <h2 className='mb-4 text-xl text-center font-semibold'>Manage Category</h2>

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
                                <th>Sl.</th>
                                <th>Category Image</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='border border-gray-300 text-xs xl:text-sm'>

                            {
                                categories.slice().reverse().map((category, index) => <tr className='border-b border-gray-300 justify-start' key={category._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img className='h-12 w-20 object-center object-cover' src={category?.image} alt="" />
                                    </td>
                                    <td>{category.name || "N/A"} </td>
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
                                                <li className=''><Link to={'/dashboard/update-category'} state={{ category, id: category._id }}><button>Update</button></Link></li>
                                                <li className=''><button onClick={() => handleDeleteProduct(category?._id)}>Delete</button></li>

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

export default ManageCategory;