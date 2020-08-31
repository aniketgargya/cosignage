import { UserProvider, CartProvider } from "../contexts";
import { VisitLogger, NavBar } from "../components";
import Head from "next/head";
import styles from "../styles/_app.css";

const App = ({ Component, pageProps }) => {

    return (
        <>
            <style jsx>{styles}</style>

            <UserProvider>
                <VisitLogger>
                    <CartProvider>
                        <Head>
                            <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
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