import React, { useState } from 'react';
import useCarts from '../../hooks/useCarts';
import { IoMdHeartEmpty } from 'react-icons/io';
import { GoPlus, GoTrash } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';



const Cart = () => {

    const axiosSecure = useAxiosSecure();
    const [carts, refetch, isLoading] = useCarts();
    console.log(carts);

    const handleDecrease = (cart) => {
        const count = cart.quantity;
        if (count > 1) {
            const newQuantity = count - 1;
            axiosSecure.patch(`/carts/${cart._id}`, { newQuantity })
                .then(res => {
                    if (res?.data?.modifiedCount > 0) {
                        toast.success("Cart quantity updated")
                        refetch()
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Something went wrong!")
                })
        } else {
            toast.error("Quantity cannot be less than 1")
        }
    }

    const handleIncrease = (cart) => {
        const count = cart?.quantity;
        const newQuantity = count + 1;
        axiosSecure.patch(`/carts/${cart._id}`, { newQuantity })
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    toast.success("Cart quantity updated")
                    refetch()
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Something went wrong!")
            })

    }

    const handleDelete = (_id) => {
        console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f95c07",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire({
                //   title: "Deleted!",
                //   text: "Your file has been deleted.",
                //   icon: "success"
                // });
                axiosSecure.delete(`/carts/${_id}`)
                    .then(res => {
                        if (res?.data?.deletedCount > 0) {
                            toast.success("Remove a item form cart list.")
                            refetch();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error("Something went wrong!")
                    })
            }
        });
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='md:col-span-2'>
                {
                    carts.map(cart => <div key={cart._id} className='my-4 flex gap-2'>
                        <div className='flex gap-2 items-center border border-gray-300 w-full p-2'>
                            <div>
                                <input size={24} type="checkbox" name="" id="" />
                            </div>
                            <div className=' flex gap-2 w-full'>

                                <img className='w-28 h-28 object-cover' src={cart?.product?.images[0]} alt={cart?.product?.name} />
                                <div className='flex gap-2 w-full justify-between'>
                                    <div>
                                        <h2>{cart?.product?.title}</h2>
                                        <span>Product: {cart?.product?.productName}</span>,
                                        <span> Brand: {cart?.product?.brand}</span>
                                        <p>Price: <del>{cart?.product?.price}tk</del> {cart.product.price - (cart?.product?.price - (cart?.product?.discount * 100))}tk</p>
                                    </div>

                                    <div className='flex flex-col items-end gap-2 justify-between'>

                                        <div className="inline-flex items-center border border-gray-300 px-4 py-2 rounded-md">
                                            <button
                                                onClick={() => handleDecrease(cart)}
                                                className="text-base px-2 text-gray-500 cursor-pointer hover:text-black"
                                            >
                                                <FiMinus />
                                            </button>
                                            <span className="px-4 text-base font-medium">{cart?.quantity}</span>
                                            <button
                                                onClick={() => handleIncrease(cart)}
                                                className="text-base px-2 text-gray-500 cursor-pointer hover:text-black"
                                            >
                                                <GoPlus size={18} />
                                            </button>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            {/* <button className='cursor-pointer btn btn-outline border-gray-300' ><IoMdHeartEmpty size={18} /></button> */}
                                            <button onClick={() => handleDelete(cart?._id)} className='cursor-pointer btn btn-outline border-gray-300' ><GoTrash size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div></div>
        </div>
    );
}

export default Cart;