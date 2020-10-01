import { useEffect } from "react";
import Head from "next/head";

const Success = () => {
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify({}));
    });

    return (
        <>
            <style jsx>{`
                main {
                    padding: 50px 100px;
                    min-height: 50vh;
                }

                @media only screen and (max-width: 1000px) {
                    main {
                        padding: 50px 50px;
                    }
                }
            `}</style>
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
