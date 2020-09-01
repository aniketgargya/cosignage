import { UserProvider, CartProvider } from "../contexts";
import { VisitLogger, NavBar, CustomFooter } from "../components";
import Head from "next/head";
import styles from "../styles/pages/_app.css";

const App = ({ Component, pageProps }) => {

    return (
        <>
            <style jsx>{styles}</style>

            <UserProvider>
                <VisitLogger>
                    <CartProvider>
                        <Head>
                            <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
                            <link rel="icon" type="image/png" href="/img/icon/favicon.png" />
                        </Head>
                        <NavBar />
                        <Component {...pageProps} />
                        <CustomFooter />
                    </CartProvider>
                </VisitLogger>
            </UserProvider>
        </>
    );
};

export default App;