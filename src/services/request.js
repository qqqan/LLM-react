import axios from "axios";

const token =
    "pat_grOS1nMCzZvK3KRpPJuT03Y0W7uhpfd3uQ3BYSKMGTrWswSNvNhH28PqJo3SmSNl";
const request = axios.create({
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});

request.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default request;
