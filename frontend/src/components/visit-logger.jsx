import { useEffect, useCallback } from "react";
import { useUser } from "../contexts";
import axios from "axios";
import { UserId } from "../types";

const VisitLogger = ({ children }) => {
    const { userId } = useUser();

    const logVisit = useCallback(async () => {
        if (UserId.guard(userId)) {
            try {
                await axios({
                    url: "/api/a/visit",
                    method: "POST",
                    data: {
                        userId
                    }
                });
            } catch (e) { }
        }
    }, [userId]);

    useEffect(() => {
        logVisit();
    }, [userId]);

    return children;
};

export { VisitLogger };
