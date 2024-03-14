import axios from "axios";
import { BASE_URL } from "./HelperService";
import { getTokenFromLocalStorage } from "../auth/HelperAuth";

export const publicAxio = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    // i want to modification in request
    const token = getTokenFromLocalStorage();
    if (token) {
      console.log(config.header);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
