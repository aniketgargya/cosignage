import { Formik, Field, Form } from "formik";
import axios from "axios";
import { TextField, CustomButton, Message } from "../components";
import { axiosError } from "../functions";
import Head from "next/head";
import { useUser } from "../contexts";

const Contact = () => {
    const { userId } = useUser();
    return (
        <>
            <style jsx>{`
                main {
                    max-width: 1400px;
                    width: 80%;
                    margin: 0 auto;
                    padding: 100px 0;
                }

                .contact {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                h1 {
                    margin-bottom: 10px;
                }

                .subheader {
                    margin-bottom: 10px;
                    font-size: 18px;
                }

                :global(.contact-form) {
                    width: 60%;
                    margin-right: 10%;
                }

                :global(.contact-form > .text-field:not(:last-child)) {
                    margin-bottom: 20px;
                }

                :global(.contact-info) {
                    width: 30%;
                    text-align: right;
                }

                :global(.contact-info > h3) {
                    margin-bottom: 10px;
                }

                :global(.contact-info > p) {
                    margin-bottom: 5px;
                }

                :global(.contact-info > p > a) {
                    color: inherit;
                    font-size: inherit;
                }

                :global(.contact-info > h3:not(:first-child)) {
                    margin-top: 10px;
                }

                @media only screen and (max-width: 800px) {
                    main {
                        padding: 50px 0;
                    }

                    .contact {
                        flex-direction: column;
                    }

                    :global(.contact-form) {
                        width: 100%;
                        margin-right: 0;
                        margin-bottom: 30px;
                    }

                    :global(.contact-info) {
                        width: 100%;
                        text-align: center;
                    }

                    :global(.contact-info > h3) {
                        margin-bottom: 10px;
                    }
                }
            `}</style>
            <Head>
                <title>Contact Cosignage</title>
                <meta name="description" content="Contact Cosignage to ease your business’ communication during the coronavirus pandemic." />
            </Head>

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

                            try {
                                await axios({
                                    method: "POST",
                                    url: "/api/o/message",
                                    data: {
                                        ...values,
                                        userId
                                    }
                                });

                                setStatus({ success: true, message: "Message has been sent" });
                            } catch (e) {
                                setStatus({
                                    success: false,
                                    message: axiosError(e)
                                });
                            }
                        }}
                    >
                        {({ isSubmitting, status }) => (
                            <Form className="contact-form">
                                <Field type="text" name="name" label="Name" placeholder="Name" id="name" as={TextField} />
                                <Field type="text" name="businessName" label="Business Name" placeholder="Business Name (Optional)" id="business-name" as={TextField} />
                                <Field type="text" name="email" label="Email" placeholder="Email" id="email" as={TextField} />
                                <Field type="text" name="message" label="Message" placeholder="Message" id="message" as={TextField} />
                                <Field type="submit" value="Submit" disabled={isSubmitting} as={CustomButton} />
                                {status && <Message {...status} />}
                            </Form>
                        )}
                    </Formik>
                    <div className="contact-info">
                        <h3>Working Hours</h3>
                        <p>9AM - 4PM, Mon to Fri</p>
                        <h3>Contact</h3>
                        <p><a href="mailto:contact@cosignage.info">contact@cosignage.info</a></p>
                        <p><a href="tel:2176737346">(217)-673-7346</a></p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Contact;
