import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useCarts from "../../hooks/useCarts";

const OrderPage = () => {
    const [carts, refetch, isLoading] = useCarts()
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            deliveryArea: "Inside Dhaka",
        },
    });

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const products = location.state;

    const [deliveryCharge, setDeliveryCharge] = useState(80); // default
    const [totalAmount, setTotalAmount] = useState(0);

    const deliveryArea = watch("deliveryArea");

    // Calculate totals
    useEffect(() => {
        const charge = deliveryArea === "Inside Dhaka" ? 80 : 120;
        setDeliveryCharge(charge);

        let subtotal = 0;
        let totalDiscount = 0;

        products.forEach(item => {
            const itemTotal = item.product.price * item.quantity;
            const itemDiscount = (item.product.price * item.product.discount / 100) * item.quantity;
            subtotal += itemTotal;
            totalDiscount += itemDiscount;
        });

        setTotalAmount((subtotal + charge) - totalDiscount);
    }, [deliveryArea, products]);

    const onSubmit = (data) => {
        const discountAmount = products.reduce(
            (acc, item) => acc + (item.product.price * item.product.discount / 100) * item.quantity,
            0
        );

        const orderInfo = {
            customerName: data?.fullName,
            customerEmail: user?.email,
            customerPhone: data?.mobileNumber,
            address: data?.fullAddress,
            deliveryArea: data?.deliveryArea,
            products: products,
            deliveryCharge: deliveryCharge,
            discountAmount: discountAmount,
            totalPayableAmount: totalAmount,
            status: "New",
            paymentMethod: "Cash on delivery",
            orderDate: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
        };

        axiosSecure.post("/orders", orderInfo)
            .then(res => {
                if (res?.data?.insertedId) {
                    toast.success("Order successfully completed!");
                    axiosSecure.delete('/carts', {
                        data: products  // 👈 this is important
                    })
                        .then(res => {
                            refetch()
                        })
                        .catch(err => {
                            // console.log(err);
                        })
                    navigate("/order-confirmation", { state: orderInfo });
                }
            })
            .catch(err => {
                toast.error("Something went wrong! Try again.");
            });
    };

    const validateBangladeshiPhoneNumber = (value) => {
        const phoneRegex = /^01[3-9]\d{8}$/;
        return phoneRegex.test(value) || "Invalid phone number";
    };

    return (
        <div className="container flex flex-col lg:flex-row justify-between mx-auto my-6 gap-6">
            {/* Order Form */}
            <div className="order-form w-full lg:w-1/2 p-4 bg-white border border-gray-300 rounded">
                <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">Please Order Now</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-medium">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                            {...register("fullName", { required: "Please enter your name" })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Mobile Number</label>
                        <input
                            {...register("mobileNumber", {
                                required: "Please enter your phone number",
                                validate: validateBangladeshiPhoneNumber
                            })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="017xxxxxxxx"
                        />
                        {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Delivery Area</label>
                        <div className="flex flex-col text-start">
                            <label className="border border-gray-300 p-2 w-full text-sm flex items-center gap-1">
                                <input
                                    {...register("deliveryArea", { required: "Please select a delivery area" })}
                                    type="radio"
                                    value="Inside Dhaka"
                                />
                                <span>Inside Dhaka</span>
                            </label>
                            <label className="border border-t-0 w-full border-gray-300 p-2 text-sm flex items-center gap-1">
                                <input
                                    {...register("deliveryArea", { required: "Please select a delivery area" })}
                                    type="radio"
                                    value="Outside Dhaka"
                                />
                                <span>Outside Dhaka</span>
                            </label>
                        </div>
                        {errors.deliveryArea && <p className="text-red-500 text-sm mt-1">{errors.deliveryArea.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Address</label>
                        <input
                            {...register("fullAddress", { required: "Please enter your full address" })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your full address"
                        />
                        {errors.fullAddress && <p className="text-red-500 text-sm mt-1">{errors.fullAddress.message}</p>}
                    </div>
                    <button type="submit" className="w-full cursor-pointer bg-orange-600 text-gray-100 p-2 rounded">
                        Order Submit
                    </button>
                </form>
            </div>

            {/* Order Summary */}
            <div className="order-summary w-full lg:w-1/2 p-4 bg-white border border-gray-300 rounded h-max font-medium">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="border-gray-300">
                                <th>Product</th>
                                <th>Quantity</th>
                                <th className="text-end">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => (
                                <tr key={index} className="border-gray-300">
                                    <td className="flex gap-2 items-center">
                                        <img className="h-10 w-10 object-cover" src={item.product.images[0]} alt="" />
                                        <span className="text-xs md:text-sm">{item.product.title}</span>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td className="text-end">{item.product.price * item.quantity}Tk</td>
                                </tr>
                            ))}

                            <tr className="border-gray-300">
                                <td>Sub Total :</td>
                                <td></td>
                                <td className="text-end">
                                    {products.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}Tk
                                </td>
                            </tr>
                            <tr className="border-gray-300">
                                <td>Shipping Charge :</td>
                                <td></td>
                                <td className="text-end">{deliveryCharge}Tk</td>
                            </tr>
                            <tr className="border-gray-300">
                                <td>Discount Amount :</td>
                                <td></td>
                                <td className="text-end">
                                    {
                                        parseInt(products.reduce((acc, item) =>
                                            acc + (item.product.price * item.product.discount / 100) * item.quantity, 0))
                                    }Tk
                                </td>
                            </tr>
                            <tr className="border-gray-300 font-bold">
                                <td>Payable Amount :</td>
                                <td></td>
                                <td className="text-end">{parseInt(totalAmount)}Tk</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
