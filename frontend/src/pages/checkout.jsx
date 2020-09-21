import style from "../styles/pages/checkout.css";
import axios from "axios";
import { useCart, useUser } from "../contexts";
import { loadStripe } from "@stripe/stripe-js";
import { Formik, Field, Form } from "formik";
import { Message, CustomButton, TextField } from "../components";
import { axiosError } from "../functions"
import Head from "next/head";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const { cart } = useCart();
    const { userId } = useUser();

    return (
        <>
            <style jsx>{style}</style>
            <Head>
                <title>Checkout | cosignage.info</title>
                <meta name="description" content="Contact Cosignage to ease your business’ communication during the coronavirus pandemic." />
            </Head>

            <main>
                <h1>Checkout</h1>
                <div className="checkout">
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
                                    setStatus({
                                        success: false,
                                        message: "An unknown error occurred"
                                    });
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
                            <Form className="checkout-form">
                                <Field type="text" name="name" placeholder="Name" label="Name" id="name" as={TextField} />
                                <Field type="text" name="street" placeholder="Street Address" label="Street Address" id="street-address" as={TextField} />
                                <Field type="text" name="lineTwo" placeholder="Street Address Line Two" label="Street Address Line Two" id="street-address-line-two" as={TextField} />
                                <Field type="text" name="city" placeholder="City" label="City" id="city" as={TextField} />
                                <Field type="text" name="state" placeholder="State / Province / Region" label="City" id="city" as={TextField} />
                                <Field type="text" name="zip" placeholder="ZIP Code" label="ZIP Code" id="zip" as={TextField} />
                                <Field type="text" name="country" placeholder="Country" label="County" id="country" as={TextField} />
                                <Field type="submit" value="Proceed to Payment" disabled={isSubmitting} as={CustomButton} />
                                {status && <Message {...status} />}
                            </Form>
                        )}
                    </Formik>
                </div>
            </main>
        </>
    );
};

export default Checkout;
