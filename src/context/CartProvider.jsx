import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);

    return (
        <CartContext.Provider
            value={{
                totalPrice,
                setTotalPrice,
                quantity,
                setQuantity,
                cartProducts,
                setCartProducts
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node
}

export default CartProvider;