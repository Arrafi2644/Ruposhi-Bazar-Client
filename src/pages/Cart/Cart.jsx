import React, { useState } from 'react';
import useCarts from '../../hooks/useCarts';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { GoPlus, GoTrash } from 'react-icons/go';
import { FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Cart = () => {
  const axiosSecure = useAxiosSecure();
  const [carts, refetch, isLoading] = useCarts();

  // Store only the selected cart IDs
  const [selectedCartIds, setSelectedCartIds] = useState([]);
  // Delivery zone: "inside" or "outside"
  const [deliveryZone, setDeliveryZone] = useState('inside');

  // Toggle selection by ID
  const handleCartToggle = (cartId) => {
    setSelectedCartIds(prev =>
      prev.includes(cartId)
        ? prev.filter(id => id !== cartId)
        : [...prev, cartId]
    );
  };

  // Decrease quantity
  const handleDecrease = (cart) => {
    if (cart.quantity > 1) {
      const newQuantity = cart.quantity - 1;
      axiosSecure.patch(`/carts/${cart._id}`, { newQuantity })
        .then(res => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success('Cart quantity updated');
          }
        })
        .catch(() => toast.error('Something went wrong!'));
    } else {
      toast.error('Quantity cannot be less than 1');
    }
  };

  // Increase quantity
  const handleIncrease = (cart) => {
    const newQuantity = cart.quantity + 1;
    axiosSecure.patch(`/carts/${cart._id}`, { newQuantity })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success('Cart quantity updated');
        }
      })
      .catch(() => toast.error('Something went wrong!'));
  };

  // Delete cart item
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f95c07',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              toast.success('Item removed from cart');
              refetch();
            }
          })
          .catch(() => toast.error('Something went wrong!'));
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Compute order summary totals
  const selectedCarts = carts.filter(cart => selectedCartIds.includes(cart._id));
  const itemsTotal = selectedCarts.reduce((sum, cart) => {
    const unitPrice = Math.floor(
      cart.product.price * (1 - cart.product.discount / 100)
    );
    return sum + cart.quantity * unitPrice;
  }, 0);

  // Delivery charge per item by zone
  const shippingFeePerItem = deliveryZone === 'inside' ? 80 : 120;
  const shippingFee = shippingFeePerItem * selectedCartIds.length;
  const totalAmount = itemsTotal + shippingFee;

  // console.log("Selected products ", selectedCarts);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Cart List */}
      <div className="md:col-span-2">
        {carts.length > 0 ?
          carts.map(cart => {
            const unitPrice = Math.floor(
              cart.product.price * (1 - cart.product.discount / 100)
            );

            return (

              <div key={cart._id} className="my-4 flex gap-2 border border-gray-300 p-2 rounded">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-orange-600"
                  checked={selectedCartIds.includes(cart._id)}
                  onChange={() => handleCartToggle(cart._id)}
                />

                <img
                  className="w-28 h-28 object-cover"
                  src={cart.product.images[0]}
                  alt={cart.product.title}
                />

                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="font-semibold">{cart.product.title}</h2>
                    <p>Product: {cart.product.productName}</p>
                    <p>Brand: {cart.product.brand}</p>
                    <p>
                      Price: <del>{cart.product.price} Tk</del> {unitPrice} Tk
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="inline-flex items-center border border-gray-300 px-4 py-1 rounded-md">
                      <button onClick={() => handleDecrease(cart)}>
                        <FiMinus />
                      </button>
                      <span className="px-4">{cart.quantity}</span>
                      <button onClick={() => handleIncrease(cart)}>
                        <GoPlus />
                      </button>
                    </div>

                    <button onClick={() => handleDelete(cart._id)} className="btn btn-outline border-gray-300 btn-sm">
                      <GoTrash />
                    </button>
                  </div>
                </div>
              </div>

            );
          })

          :
          <div className='flex items-center justify-center flex-col gap-2 min-h-[calc(100vh-100px)] '>
            <h2 className='text-lg font-medium text-center'>You haven’t added anything to your cart yet.</h2>
            <Link to='/all-products' className='btn btn-sm bg-orange-600 text-white hover:bg-orange-500'>Shop Now</Link>
          </div>
        }
      </div>

      {/* Order Summary */}
      <div className="order-summary p-2 mt-4 bg-white border border-gray-300 rounded">
        <h3 className="font-semibold mb-2">Choose Delivery Area</h3>

        {/* Delivery Zone Selector */}
        <div className="mb-4">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="deliveryZone"
              value="inside"
              checked={deliveryZone === 'inside'}
              onChange={() => setDeliveryZone('inside')}
              className="form-radio h-4 w-4  accent-orange-600"
            />
            <span className="ml-2">Inside Dhaka (Tk {80} per item)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="deliveryZone"
              value="outside"
              checked={deliveryZone === 'outside'}
              onChange={() => setDeliveryZone('outside')}
              className="form-radio h-4 w-4 accent-orange-600"
            />
            <span className="ml-2">Outside Dhaka (Tk {120} per item)</span>
          </label>
        </div>

        <h3 className="font-semibold mb-2">Order Summary</h3>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty × Price</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedCarts.map(cart => {
                const unitPrice = Math.floor(
                  cart.product.price * (1 - cart.product.discount / 100)
                );
                const lineTotal = cart.quantity * unitPrice;

                return (
                  <tr key={cart._id} className="border-gray-300">
                    <td className="flex items-center gap-2">
                      <img
                        className="h-10 w-10 object-cover"
                        src={cart.product.images[0]}
                        alt={cart.product.title}
                      />
                      <span className="text-xs md:text-sm">{cart.product.title}</span>
                    </td>
                    <td>{cart.quantity} × {unitPrice} Tk</td>
                    <td className="text-end">{lineTotal} Tk</td>
                  </tr>
                );
              })}

              <tr>
                <td>Shipping Fee</td>
                <td>{selectedCartIds.length} × {shippingFeePerItem} Tk</td>
                <td className="text-end">{shippingFee} Tk</td>
              </tr>

              <tr>
                <td>Total</td>
                <td></td>
                <td className="text-end">{totalAmount} Tk</td>
              </tr>
            </tbody>
          </table>
          <Link to={selectedCarts.length > 0 ? '/order-page' : '#'} state={selectedCarts} aria-disabled={selectedCarts.length < 1}>
            <button className="btn bg-orange-600 hover:bg-orange-500 text-white text-center w-full">PROCEED TO CHECKOUT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
