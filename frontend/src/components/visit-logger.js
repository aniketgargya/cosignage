import { useEffect } from "react";
import { useUser } from "../contexts";
import axios from "axios";

const VisitLogger = ({ children }) => {
    const { userId } = useUser();

    const logVisit = async () => {
        if (!userId) return;

        try {
            await axios({
                url: "/api/analytics/visit",
                method: "POST",
                data: {
                    userId
                }
            });
        } catch (err) { }
    };

    useEffect(() => {
        logVisit();
    }, [userId]);

    return children;
};

export { VisitLogger };