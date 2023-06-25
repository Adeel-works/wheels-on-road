import axios from "axios";

const Network = axios.create({
    baseURL: 'http://localhost:4000/'
});

Network.interceptors.request.use(function (config) {
    const credentials = JSON.parse(localStorage.getItem("auth"));
    console.log({credentials});
    config.headers.Authorization = `Bearer ${credentials?.accessToken}`;
     
    return config;
});

export default Network;

