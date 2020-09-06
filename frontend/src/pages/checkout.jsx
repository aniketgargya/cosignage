import axios from "axios";
import { useCart, useUser } from "../contexts";
import { loadStripe } from "@stripe/stripe-js";
import { Formik, Field, Form } from "formik";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const { cart } = useCart();
    const { userId } = useUser();

    return (
        Object.keys(cart).length > 0 ? (
            <>
                <h2>Shipping Address</h2>

                <Formik
                    initialValues={{
                        name: "",
                        street: "",
                        lineTwo: "",
                        city: "",
                        state: "",
                        zip: "",
                        country: ""
                    }}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        setSubmitting(true);

                        const stripe = await stripePromise;

                        try {
                            const { data: { id } } = await axios({
                                method: "POST",
                                url: "/api/p/checkout-session",
                                data: {
                                    userId,
                                    cart,
                                    ...values
                                }
                            });

                            setStatus(undefined);

                            const result = await stripe.redirectToCheckout({
                                sessionId: id,
                            });

                            if (result.error) {
                                setStatus("An unknown error occurred");
                            }
                        } catch (e) {
                            if (e) {
                                if (e.response.status === 400) {
                                    setStatus(e.response.data.error || "An unknown error occurred");
                                } else if (e.response.status === 500) {
                                    setStatus("An error occurred on the server");
                                } else {
                                    setStatus("An unknown error occurred");
                                }
                            } else {
                                setStatus("An error occurred trying to communicate with the server");
                            }

                            console.log(e.response);
                        }
                    }}
                >
                    {({ isSubmitting, status }) => (
                        <Form>
                            <p>{status}</p>
                            <Field type="text" name="name" placeholder="Name" />
                            <Field type="text" name="street" placeholder="Street Address" />
                            <Field type="text" name="lineTwo" placeholder="Street Address Line Two" />
                            <Field type="text" name="city" placeholder="City" />
                            <Field type="text" name="state" placeholder="State / Province / Region" />
                            <Field type="text" name="zip" placeholder="ZIP Code" />
                            <Field type="text" name="country" placeholder="Country" />
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </>
        ) : (
                <p>Nothing in your cart</p>
            )
    );
};

export default Checkout;