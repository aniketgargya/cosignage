import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";
import axios from "axios";
import { useUser } from ".";

const CartContext = createContext({
    cart: {},
    setCart: () => { }
});

const CartProvider = ({ children }) => {
    const { userId } = useUser();
    const [cart, setCart] = useState({});

    useEffect(() => {
        const newCart = JSON.parse(localStorage.getItem("cart"));
        if (newCart) setCart(newCart);
    }, []);

    const logCart = useCallback(throttle(async (debouncedUserId, debouncedCart) => {
        console.log(debouncedCart)
        await axios({
            url: "/api/analytics/cart",
            method: "POST",
            data: {
                userId: debouncedUserId,
                cart: debouncedCart
            }
        });
    }, 5000), []);

    useEffect(() => {
        logCart(userId, cart);
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    return useContext(CartContext);
};

export { useCart, CartProvider };
