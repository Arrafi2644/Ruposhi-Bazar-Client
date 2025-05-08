import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    const location = useLocation()
    const product = location?.state;
    const [count, setCount] = useState(1);

    const handleDecrease = () => {
        if (count > 1) {
            setCount(prev => prev - 1);
        }
    };

    const handleIncrease = () => {
        setCount(prev => prev + 1);
    };

    return (
        <div className="container flex flex-col lg:flex-row justify-between mx-auto my-6 gap-6">
            <div className="order-form w-full lg:w-1/2 p-4 bg-white border border-gray-300 rounded">
                <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">Please Order Now</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input {...register("fullName")} className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 ">Mobile Number</label>
                        <input {...register("mobileNumber")} className="w-full p-2 border border-gray-300 rounded"
                            placeholder="017xxxxxxxx"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Delivery Area</label>
                        <div className="flex flex-col text-start space-x-2">
                            <label className="border border-gray-300 p-2 w-full"><input {...register("deliveryArea")} className="border border-gray-400" type="radio" value="Inside Dhaka" /> Inside Dhaka</label>

                            <label className="border border-t-0 w-full border-gray-300 p-2 "><input {...register("deliveryArea")} className="" type="radio" value="Outside Dhaka" /> Outside Dhaka</label>

                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Address</label>
                        <input {...register("fullAddress")} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <button type="submit" className="w-full bg-yellow-900 text-gray-100 p-2 rounded">Order Submit</button>
                </form>
            </div>
            <div className="order-summary w-full lg:w-1/2 p-4 bg-white border border-gray-300 rounded h-max">

                <div className="overflow-x-auto ">
                    <table className="table">
                        {/* head */}
                        <thead >
                            <tr className="border-gray-300">
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-gray-300">

                                <td>
                                    <img className="h-10 w-10 object-center object-cover" src={product?.images[0]} alt="" />
                                    <span className="text-xs">{product?.title}</span>
                                </td>
                                <td>
                                    <div className="inline-flex items-center border border-gray-300 p-1 rounded-md">
                                        <button
                                            onClick={handleDecrease}
                                            className="text-base px-2 text-gray-500 cursor-pointer hover:text-black"
                                        >
                                            −
                                        </button>
                                        <span className="px-4 text-base font-medium">{count}</span>
                                        <button
                                            onClick={handleIncrease}
                                            className="text-base px-2 text-gray-500 cursor-pointer hover:text-black"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                {/* <td>1</td> */}
                                <td>{product?.price}Tk</td>
                            </tr>
                            <tr className="border-gray-300">
                                <td>Total :</td>
                                <td></td>

                                <td className="text-end">{product?.price}</td>
                            </tr>
                            <tr className="border-gray-300">
                                <td>Shipping Charge :</td>
                                <td></td>

                                <td className="text-end">60 Tk</td>
                            </tr>
                            <tr className="border-gray-300">
                                <td>Discount Amount :</td>
                                <td></td>

                                <td className="text-end">0 Tk</td>
                            </tr>
                            <tr className="border-gray-300">
                                <td>Payable Amount :</td>

                                <td></td>
                                <td className="text-end">0 Tk</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;