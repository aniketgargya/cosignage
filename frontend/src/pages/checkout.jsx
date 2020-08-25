import { useRef, useState } from "react";
import axios from "axios";
import { useCart } from "../contexts";
import { loadStripe } from "@stripe/stripe-js";
import { Cart } from "../types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const { cart, setCart } = useCart();
    const textRef = useRef(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    return (
        <>
            <pre>{JSON.stringify(cart)}</pre>
            <textarea ref={textRef}></textarea>

            <form>
                <h3>Shipping Info</h3>
                <input placeholder="Name" />
                <input placeholder="Address" />

                <button onClick={() => {
                    setCart(JSON.parse(textRef.current.value));
                }}>Submit</button>

                <button onClick={async () => {
                    const stripe = await stripePromise;

                    if (Object.keys(cart).length && Cart.guard(cart)) {
                        const { data: { id } } = await axios({
                            method: "POST",
                            url: "/api/p/checkout-session",
                            data: {
                                cart
                            }
                        });

                        const result = await stripe.redirectToCheckout({
                            sessionId: id,
                        });

                        if (result.error) { }
                    }
                }}>
                    Checkout With Stripe
        </button>
            </form>
        </>
    );
};

export default Checkout;