const axiosError = e => {
    if (e.response) {
        if (e.response.status === 400) {
            return e.response.data.message || "An unknown error occurred"
        } else if (e.response.status === 500) {
            return `An error occurred on the server ${e.response.data.errorCode || ""}`
        } else {
            return "An unknown error occurred";
        }
    } else {
        return "An error occurred trying to communicate with the server";
    }
};

module.exports = { axiosError };
