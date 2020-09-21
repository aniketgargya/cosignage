import { useEffect } from "react";
import style from "../styles/pages/success.css";
import Head from "next/head";

const Success = () => {
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify({}));
    });

    return (
        <>
            <style jsx>{style}</style>
            <Head>
                <title>Success | cosignage.info</title>
            </Head>

            <main>
                <h1>You've successfully purchased your items!</h1>
                <p>Thank you for shopping at Cosignage</p>
            </main>
        </>
    );
};

export default Success;
