import { UserProvider, CartProvider } from "../contexts";
import { NavBar, CustomFooter } from "../components";
import Head from "next/head";
import styles from "../styles/pages/_app.css";

const App = ({ Component, pageProps }) => {

    return (
        <>
            <style jsx>{styles}</style>

            <UserProvider>
                <CartProvider>
                    <Head>
                        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
                        <link rel="icon" type="image/png" href="/img/icon/favicon.png" />
                        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
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