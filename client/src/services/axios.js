import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
    function (config) {
        let AUTH_TOKEN = null;
        try {
            AUTH_TOKEN = JSON.parse(localStorage.getItem("token"))?.token;
        } catch (e) {}
        if (!!AUTH_TOKEN) {
            config.headers["Authorization"] = `Bearer ${AUTH_TOKEN}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error.response.data);
    },
);
