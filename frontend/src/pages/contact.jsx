import style from "../styles/pages/contact.css";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { TextField, CustomButton, Message } from "../components";
import { axiosError } from "../functions";
import Head from "next/head";

const Contact = () => {
    return (
        <>
            <style jsx>{style}</style>
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
                                        ...values
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
                        <p>contact@cosignage.info</p>
                        <p>Phone: (217)-673-7346</p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Contact;
