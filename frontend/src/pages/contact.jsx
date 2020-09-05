import style from "../styles/pages/contact.css";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { TextField, CustomButtom, Message } from "../components";

const Contact = () => {
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

                            try {
                                const { data } = await axios({
                                    method: "POST",
                                    url: "/api/o/message",
                                    data: {
                                        ...values
                                    }
                                });

                                setStatus({ success: true, message: "Message has been sent" });
                            } catch (e) {
                                if (e) {
                                    if (e.response.status === 400) {
                                        setStatus({
                                            success: false,
                                            message: e.response.data.message || "An unknown error occurred"
                                        });
                                    } else if (e.response.status === 500) {
                                        setStatus({
                                            success: false,
                                            message: `An error occurred on the server ${e.response.data.errorCode}`
                                        });
                                    } else {
                                        setStatus({
                                            success: false,
                                            message: "An unknown error occurred"
                                        });
                                    }
                                } else {
                                    setStatus({
                                        success: false,
                                        message: "An error occurred trying to communicate with the server"
                                    });
                                }
                            }
                        }}
                    >
                        {({ isSubmitting, status }) => (
                            <Form className="contact-form">
                                <Field type="text" name="name" label="Name" placeholder="Name" as={TextField} />
                                <Field type="text" name="businessName" label="Business Name" placeholder="Business Name" as={TextField} />
                                <Field type="text" name="email" label="Email" placeholder="Email" as={TextField} />
                                <Field type="text" name="message" label="Message" placeholder="Message" as={TextField} />
                                <Field type="submit" value="Submit" disabled={isSubmitting} as={CustomButtom} />
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