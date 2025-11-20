import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './cartItem';
import { toggleStatusTab } from '../stores/cart';
import { products } from '../products'; // ← only this line added

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }

    // WhatsApp checkout function (in English)
    const handleCheckout = () => {
        let message = "*New Order - Shopping Cart*\n\n";
        let totalPrice = 0;

        carts.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const lineTotal = product.price * item.quantity;
                totalPrice += lineTotal;
                message += `• ${product.name}\n  Quantity: ${item.quantity} × ${product.price.toLocaleString()} FCFA = ${lineTotal.toLocaleString()} FCFA\n\n`;
            }
        });

        message += `*Total Amount: ${totalPrice.toLocaleString()} FCFA*`;

        const phoneNumber = "237677859945"; // ← Change this to your real WhatsApp number
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px]
            transform transition-transform duration-500
            ${statusTab === false ? "translate-x-full" : ""}
        `}>
            <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
            <div className='p-5'>
                {carts.map((item, key) =>
                    <CartItem key={key} data={item}/>
                )}
            </div>
            <div className='grid grid-cols-2'>
                <button className='bg-black text-white' onClick={handleCloseTabCart}>CLOSE</button>
                <button 
                    className='bg-amber-600 text-white font-semibold' 
                    onClick={handleCheckout}
                >
                    CHECKOUT
                </button>
            </div>
        </div>
    )
}

export default CartTab