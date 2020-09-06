import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { v1, validate, version } from "uuid";

const UserContext = createContext({
    userId: null
});

const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (validate(userId) && version(userId) === 1) {
            setUserId(userId);
        } else {
            setUserId(v1());
        }

    }, []);

    const logVisit = useCallback(async () => {
        try {
            await axios({
                url: "/api/a/visit",
                method: "POST",
                data: { userId }
            });
        } catch (e) { }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
            logVisit();
        }
    }, [userId]);

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
