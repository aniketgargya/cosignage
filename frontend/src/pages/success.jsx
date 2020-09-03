import { useEffect } from "react";

const Checkout = () => {
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify({}));
    });

    return <p>You've successfully purchased your items!</p>;
};

export default Checkout;