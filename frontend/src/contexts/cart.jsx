import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";
import axios from "axios";
import { useUser } from ".";

const CartContext = createContext({
    cart: [],
    setCart: () => { },
    setCartItemQuantity: () => { },
    getCartItemQuantity: () => { }
});

const CartProvider = ({ children }) => {
    const { userId } = useUser();
    const [cart, setCart] = useState({});

    const retrieveCart = async () => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart"));

            await axios({
                method: "POST",
                url: "/api/p/cart",
                data: { cart }
            });

            setCart(cart);
        } catch {
            setCart({});
        }
    };

    const getCartItemQuantity = useCallback((cartValue, productId, variationId) => {
        if (cartValue[productId] === undefined) return 0;
        if (cartValue[productId][variationId] == undefined) return 0;
        return cartValue[productId][variationId];
    }, []);

    const setCartItemQuantity = useCallback((productId, variationId, quantity) => {
        setCart(c => {
            const n = {
                ...c
            };
            if (n[productId] === undefined) n[productId] = {};
            n[productId][variationId] = quantity;
            return n;
        });
    }, [setCart]);

    useEffect(() => {
        retrieveCart();
    }, []);

    const logCart = useCallback(throttle(async (debouncedUserId, debouncedCart) => {
        try {
            await axios({
                url: "/api/a/cart",
                method: "POST",
                data: {
                    userId: debouncedUserId,
                    cart: debouncedCart
                }
            });
        } catch { }
    }, 5000), []);

    useEffect(() => {
        if (userId) logCart(userId, cart);
    }, [userId, cart]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart, setCartItemQuantity, getCartItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    return useContext(CartContext);
};

export { useCart, CartProvider };
