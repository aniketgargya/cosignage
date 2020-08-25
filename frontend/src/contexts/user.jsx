import { createContext, useContext, useEffect, useState } from "react";
import { v1 } from "uuid";
import { UserId } from "../types";

const UserContext = createContext({
    userId: null
});

const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        let newUserId = localStorage.getItem("userId");

        if (!UserId.guard(newUserId)) {
            newUserId = v1();
        }

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
