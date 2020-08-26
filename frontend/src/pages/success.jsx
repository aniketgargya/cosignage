import { useEffect } from "react";
import { useCart } from "../contexts";

const Checkout = () => {
    useCart();

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify({}));
    });

    return <p>You've successfully purchased your items!</p>;
};

export default Checkout;