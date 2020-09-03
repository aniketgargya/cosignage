import style from "../styles/pages/contact.css";
import { Formik, Field, Form } from "formik";
import { TextField, CustomButtom } from "../components";

const Index = () => {
    return (
        <>
            <style jsx>{style}</style>

            <main>
                <h1>Need to contact us?</h1>
                <p className="subheader">We'll get back to you within the next business day.</p>
                <div className="contact">
                    <Formik
                        initialValues={{
                            name: "",
                            businessName: "",
                            email: "",
                            message: ""
                        }}
                        onSubmit={async (values, { setSubmitting, setStatus }) => {
                            setSubmitting(true);
                            await new Promise((resolve, reject) => {
                                setTimeout(resolve, 4000);
                            });
                            setSubmitting(false);

                            // const stripe = await stripePromise;

                            // if (Cart.guard(cart)) {
                            //     try {
                            //         const { data: { id } } = await axios({
                            //             method: "POST",
                            //             url: "/api/p/checkout-session",
                            //             data: {
                            //                 userId,
                            //                 cart,
                            //                 ...values
                            //             }
                            //         });

                            //         setStatus(undefined);

                            //         const result = await stripe.redirectToCheckout({
                            //             sessionId: id,
                            //         });

                            //         if (result.error) {
                            //             setStatus("An unknown error occurred");
                            //         }
                            //     } catch (e) {
                            //         if (e) {
                            //             if (e.response.status === 400) {
                            //                 setStatus(e.response.data.error || "An unknown error occurred");
                            //             } else if (e.response.status === 500) {
                            //                 setStatus("An error occurred on the server");
                            //             } else {
                            //                 setStatus("An unknown error occurred");
                            //             }
                            //         } else {
                            //             setStatus("An error occurred trying to communicate with the server");
                            //         }

                            //         console.log(e.response);
                            //     }
                            // }
                        }}
                    >
                        {({ isSubmitting, status }) => (
                            <Form className="contact-form">
                                <p>{status}</p>
                                <Field type="text" name="name" label="Name" placeholder="Name" as={TextField} />
                                <Field type="text" name="businessName" label="Business Name" placeholder="Business Name" as={TextField} />
                                <Field type="text" name="email" label="Email" placeholder="Email" as={TextField} />
                                <Field type="text" name="message" label="Message" placeholder="Message" as={TextField} />
                                <Field type="submit" value="Submit" disabled={isSubmitting} as={CustomButtom} />
                            </Form>
                        )}
                    </Formik>
                    <div className="contact-info">
                        <h3>Working Hours</h3>
                        <p>9AM - 4PM, Mon to Fri</p>
                        <h3>Contact</h3>
                        <p>contact@cosignage.info</p>
                        <p>Phone: (217)-673-7346</p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Index;
