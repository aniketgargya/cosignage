import { useEffect } from "react";

const Success = () => {
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify({}));
    });

    return <p>You've successfully purchased your items!</p>;
};

export default Success;
