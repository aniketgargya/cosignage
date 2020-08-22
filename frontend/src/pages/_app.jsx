import { UserProvider, CartProvider } from "../contexts";
import { VisitLogger, NavBar } from "../components";
import Head from "next/head";

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
                    font-size: 62.5%;
                }

                body {
                    font-family: "Lato", sans-serif;
                    font-weight: 400;
                    line-height: 1.6;
                }

                :root {
                    --gray-dark-1: #212121;
                }

            `}</style>

            <UserProvider>
                <VisitLogger>
                    <CartProvider>
                        <Head>
                            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
                        </Head>
                        <NavBar />
                        <Component {...pageProps} />
                    </CartProvider>
                </VisitLogger>
            </UserProvider>
        </>
    );
};

export default App;