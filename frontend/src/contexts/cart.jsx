import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser } from ".";
import { debounce } from "lodash";

const CartContext = createContext({
    cart: {},
    setCart: () => { }
});

const CartProvider = ({ children }) => {
    const { userId } = useUser();
    const [cart, setCart] = useState({});

    const logCart = debounce(useCallback((debouncedUserId, debouncedCart) => {
        await axios({
            url: "/api/analytics/visit",
            method: "POST",
            data: {
                userId: debouncedUserId,
                cart: debouncedCart
            }
        });
    }, []));

    useEffect(() => {
        logCart(userId, debouncedCart);
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
