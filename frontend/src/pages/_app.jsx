import { ThemeProvider } from "styled-components";
import { UserProvider, CartProvider, theme } from "../contexts";
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
                        <ThemeProvider theme={theme}>
                            <Head>
                                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
                            </Head>
                            <NavBar />
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </CartProvider>
                </VisitLogger>
            </UserProvider>
        </>
    );
};

export default App;