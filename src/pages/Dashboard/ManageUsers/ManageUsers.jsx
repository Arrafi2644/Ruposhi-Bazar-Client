import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { BiDotsVertical } from 'react-icons/bi';
import useUsers from '../../../hooks/useUsers';

const ManageUsers = () => {

    const [users, isLoading, refetch] = useUsers()
    const axiosSecure = useAxiosSecure();
    // console.log("users are", users);

    const handleMakeAdmin = (_id) => {
        const updatedRole = "Admin"
        axiosSecure.patch(`/users/${_id}`, { updatedRole })
            .then(res => {
                // console.log(res);
                if (res?.data?.modifiedCount > 0) {
                    // console.log(totalPriceRefetch);
                    toast.success("Set as admin successfully!")
                    refetch()
                }

            })
            .catch(err => {
                // console.log(err);
                toast.error("Something went wrong!")
            })
    }
    const handleMakeUser = (_id) => {
        const updatedRole = "User"
        axiosSecure.patch(`/users/${_id}`, { updatedRole })
            .then(res => {
                // console.log(res);
                if (res?.data?.modifiedCount > 0) {
                    // console.log(totalPriceRefetch);
                    toast.success("Set as user successfully!")
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
            <h2 className='mb-4 text-xl text-center font-semibold'>Manage Users</h2>

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
                                        <th>User Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Current Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='border border-gray-300 text-xs lg:text-sm'>
                                    {
                                        users.slice().reverse().map((user, index) => <tr className='border-b border-gray-300 justify-start' key={user._id}>
                                            <td>{user?._id.slice(-5)}</td>
                                            <td>{user?.name || "N/A"} </td>
                                            <td>{user?.email || "N/A"}</td>
                                            <td><span className={`px-2 py-[2px] rounded-md text-white ${user?.role === "User" ? "bg-green-500" : "bg-orange-600"}`}>{user?.role || "N/A"}</span></td>

                                            <td>
                                                <div
                                                    // className={`dropdown ${user?.role === "user" || order?.status === "Delivered" ? "pointer-events-none opacity-50" : ""}`}
                                                    className={`dropdown`}
                                                >
                                                    <div tabIndex={0} className="text-right p-1.5 cursor-pointer rounded-md"><span className=' px-1 rounded-md flex '><BiDotsVertical size={20} /></span></div>
                                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 -right-1 pr-0 top-7 shadow-sm text-gray-900">
                                                        {
                                                            user?.role === "User" && <li className=''><button onClick={() => handleMakeAdmin(user?._id)}>Add as Admin</button></li>
                                                        }
                                                        {
                                                            user?.role === "Admin" && <li className=''><button onClick={() => handleMakeUser(user?._id)}>Add as User</button></li>
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

export default ManageUsers;