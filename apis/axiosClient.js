import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    paramsSerializer: (params) => queryString.stringify(params),
    withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
    let user = await AsyncStorage.getItem("user");

    user = JSON.parse(user);

    console.log(user?.token);

    config.headers = {
        Authorization: user?.token ? `Bearer ${user?.token}` : "",
        Accept: "application/json",
        ...config.headers,
    };

    config.data;

    return config;
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res.data && res.status === 200) {
            return res.data;
        }
        throw new Error("Error");
    },
    (error) => {
        console.log(`Error api ${JSON.stringify(error)}`);
        throw new Error(error.response);
    }
);

export default axiosClient;
