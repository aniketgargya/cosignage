import { UserProvider, CartProvider } from "../contexts";
import { VisitLogger } from "../components";

const App = ({ Component, pageProps }) => {
    return (
        <UserProvider>
            <VisitLogger>
                <CartProvider>
                    <Component {...pageProps} />
                </CartProvider>
            </VisitLogger>
        </UserProvider>
    );
};

export default App;