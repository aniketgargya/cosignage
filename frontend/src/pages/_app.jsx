import { UserProvider } from "../contexts";
import { VisitLogger } from "../components";

const App = ({ Component, pageProps }) => {
    return (
        <UserProvider>
            <VisitLogger>
                <Component {...pageProps} />
            </VisitLogger>
        </UserProvider>
    );
};

export default App;