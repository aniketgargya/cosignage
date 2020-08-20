import { useEffect } from "react";
import { useUser } from "../contexts";
import axios from "axios";

const VisitLogger = ({ children }) => {
    const { userId } = useUser();

    const logVisit = async () => {
        if (!userId) return;

        try {
            await axios({
                url: "/api/a/visit",
                method: "GET",
                data: {
                    userId
                }
            });
        } catch (err) { }
    };

    useEffect(() => {
        console.log(userId);
        logVisit();
    }, [userId]);

    return children;
};

export { VisitLogger };
