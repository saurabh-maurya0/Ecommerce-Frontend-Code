import { React,  useEffect, useState } from "react";

import Swal from "sweetalert2";
import { privateAxios, publicAxio } from "../services/AxiosService";

const UseLoader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //request interceptors
    privateAxios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    //response interceptors
    privateAxios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        setLoading(false);
        if (error.code === "ERR_NETWORK") {
          // toast.error('Backend Server is down !!')
          Swal.fire({
            title: "Network Error",
            html: "Backend server is down ",
            icon: "error",
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);
  useEffect(() => {
    //request interceptors
    publicAxio.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    //response interceptors
    publicAxio.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        setLoading(false);
        if (error.code === "ERR_NETWORK") {
          // toast.error('Backend Server is down !!')
          Swal.fire({
            title: "Network Error",
            html: "Backend server is down ",
            icon: "error",
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return loading;
};

export default UseLoader;
