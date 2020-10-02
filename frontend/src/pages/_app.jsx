import { UserProvider, CartProvider } from "../contexts";
import { NavBar, CustomFooter } from "../components";
import Head from "next/head";
import "leaflet/dist/leaflet.css";

const App = ({ Component, pageProps }) => {

    return (
        <>
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                }

                *, *::before, *::after {
                    box-sizing: inherit;
                }

                html {
                    box-sizing: border-box;
                }

                body {
                    font-family: "Nunito", sans-serif;
                    font-weight: 400;
                }

                :root {
                    --color-primary: #662D91;
                    --color-primary-dark: #2D054B;

                    --color-gray-dark-1: #565656;
                    --color-gray-dark-2: #333333;
                    --color-gray-light-1: #FAFAFA;
                    --color-gray-light-2: #F7F7F7;

                    --color-white: #FFFFFF;
                    --color-black: #000000;
                }

                h1 {
                    font-size: 48px;
                    color: var(--color-primary);
                    line-height: 120%;
                    font-weight: 400;
                }

                h2 {
                    font-size: 28px;
                    color: var(--color-gray-dark-2);
                    font-weight: 400;
                }

                h3 {
                    text-transform: uppercase;
                    font-weight: 300;
                }

                p {
                    font-size: 18px;
                    color: var(--color-gray-dark-1);
                    line-height: 150%;
                    font-weight: 400;
                }

                @media only screen and (max-width: 1200px) {
                    h1 {
                        font-size: 38px;
                    }

                    h2 {
                        font-size: 30px;
                    }

                    p {
                        font-size: 14px;
                    }
                }

                @media only screen and (max-width: 500px) {
                    h1 {
                        font-size: 32px;
                    }

                    h2 {
                        font-size: 24px;
                    }
                }
            `}</style>

            <UserProvider>
                <CartProvider>
                    <Head>
                        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
                        <link rel="icon" type="image/png" href="/img/icon/themed/favicon.png" />
                        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
                        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta httpEquiv="Content-Type" content="text/html; charset=ISO-8859-1" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </Head>
                    <NavBar />
                    <Component {...pageProps} />
                    <CustomFooter />
                </CartProvider>
            </UserProvider>
        </>
    );
};

export default App;
