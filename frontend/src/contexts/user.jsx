import { createContext, useContext, useEffect, useState } from "react";
import { v1 } from "uuid";

const UserContext = createContext({
    userId: null
});

const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const newUserId = localStorage.getItem("userId") || v1();
        setUserId(newUserId);
        localStorage.setItem("userId", newUserId);
    }, []);

    return (
        <UserContext.Provider value={{ userId }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
};

export { useUser, UserProvider };
