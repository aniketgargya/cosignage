import { v4 } from "uuid";
import { useCart } from "../contexts";

const Index = () => {
    const { cart, setCart } = useCart();

    return (
        <>
            <pre>{JSON.stringify(cart)}</pre>
            <button onClick={() => {
                setCart({
                    hey: v4()
                });
            }}>Modify Cart</button>
        </>
    );
};

export default Index;