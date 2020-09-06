import axios from "axios";
import { useCart, useUser } from "../contexts";
import { loadStripe } from "@stripe/stripe-js";
import { Formik, Field, Form } from "formik";
import { Message } from "../components";
import { axiosError } from "../functions"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const { cart } = useCart();
    const { userId } = useUser();

    return (
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
                        setStatus({
                            success: false,
                            message: axiosError(e)
                        });
                    }
                }}
            >
                {({ isSubmitting, status }) => (
                    <Form>
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
                        {status && <Message {...status} />}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Checkout;