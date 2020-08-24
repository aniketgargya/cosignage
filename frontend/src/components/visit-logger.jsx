import { useEffect, useCallback } from "react";
import { useUser } from "../contexts";
import axios from "axios";

const VisitLogger = ({ children }) => {
    const { userId } = useUser();

    const logVisit = useCallback(async () => {
        if (!userId) return;

        try {
            await axios({
                url: "/api/a/visit",
                method: "POST",
                data: {
                    userId
                }
            });
        } catch (e) {

        }
    }, [userId]);

    useEffect(() => {
        logVisit();
    }, [userId]);

    return children;
};

export { VisitLogger };
