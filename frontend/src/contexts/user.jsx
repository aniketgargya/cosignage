import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { v1, validate, version } from "uuid";
import { useRouter } from "next/router";

const UserContext = createContext({
    userId: null
});

const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const { pathname } = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (validate(userId) && version(userId) === 1) {
            setUserId(userId);
        } else {
            setUserId(v1());
        }

    }, []);

    useEffect(() => {
        setSessionId(v1());
    }, []);

    const logVisit = useCallback(async () => {
        try {
            if (!userId || !sessionId || !pathname) return;

            await axios({
                url: "/api/a/visit",
                method: "POST",
                data: {
                    userId,
                    sessionId,
                    pathname
                }
            });
        } catch (e) { }
    }, [userId, sessionId, pathname]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
        }
    }, [userId]);

    useEffect(() => {
        logVisit();
    }, [userId, sessionId, pathname]);

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
