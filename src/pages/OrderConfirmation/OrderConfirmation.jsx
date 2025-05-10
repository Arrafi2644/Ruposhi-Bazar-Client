import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
    const location = useLocation();
    const orderInfo = location?.state;

    const {
        customerName,
        customerEmail,
        customerPhone,
        address,
        deliveryArea,
        orderDate,
        quantity,
        deliveryCharge,
        discountAmount,
        totalPayableAmount,
        product,
        paymentMethod
    } = orderInfo || {};

    const productTitle = product?.title || "Product";
    const productPrice = product?.price || 0;
    const subtotal = productPrice * quantity;
    const discount = discountAmount || 0;
    const shipping = deliveryCharge || 0;
    const total = totalPayableAmount || 0;

    // console.log(orderInfo);

    return (
        <div className="font-sans max-w-xl mx-auto p-5 bg-white text-center">
            {/* Header */}
            <div className="bg-yellow-900 text-white p-5 rounded-t-md">
                <span className="text-2xl mr-2">✓</span>
                <h1 className="inline text-2xl font-bold">Thank you</h1>
            </div>
            <p className="mt-4 text-gray-700">
                Your order has been successfully submitted. One of our representatives will call you shortly.
            </p>

            {/* Order Details Box */}
            <div className="border border-gray-300 p-5 mt-5 text-left">
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <p><strong>Customer:</strong> {customerName}</p>
                    <p><strong>Phone:</strong> {customerPhone}</p>
                    <p><strong>Address:</strong> {address}</p>
                    <p><strong>Area:</strong> {deliveryArea}</p>
                    <p><strong>Date:</strong> {orderDate}</p>
                    <p><strong>Total:</strong> {total} TK</p>
                    <p><strong>Payment method:</strong> {paymentMethod}</p>
                </div>
                <p className="mt-2 text-gray-700">Pay cash upon delivery.</p>

                {/* Order Details Table */}
                <div className="mt-5">
                    <h3 className="text-lg font-semibold">Order details</h3>
                    <table className="w-full mt-2 border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 font-bold w-1/4">Product</td>
                                <td className="py-2">{quantity} x {productTitle}</td>
                                <td className="py-2 text-right">{subtotal} TK</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 font-bold">Subtotal</td>
                                <td className="py-2"></td>
                                <td className="py-2 text-right">{subtotal} TK</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 font-bold">Discount</td>
                                <td className="py-2"></td>
                                <td className="py-2 text-right">{discount} TK</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 font-bold">Shipping</td>
                                <td className="py-2"></td>
                                <td className="py-2 text-right">{shipping} TK</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2 font-bold">Payment method</td>
                                <td className="py-2"></td>
                                <td className="py-2 text-right font-bold">{paymentMethod}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Total</td>
                                <td className="py-2"></td>
                                <td className="py-2 text-right font-bold">{total} TK</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
