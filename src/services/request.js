import axios from "axios";

const token =
    "pat_0B8Z1OJS4X0VBJoCN7D8vsiVM7p5NpLmj4Syd6YFemG3C8oH835F7NVmMvbaA53Z";
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
