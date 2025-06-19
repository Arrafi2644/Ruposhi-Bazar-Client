import React from 'react';
import useCarts from '../../hooks/useCarts';

const Cart = () => {
    const [carts, refetch, isLoading] = useCarts()

    return (
        <div>
            Cart products: {carts.length}
        </div>
    );
};

export default Cart;