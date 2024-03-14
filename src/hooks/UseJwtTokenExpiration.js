import React, { useContext, useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "../auth/HelperAuth";
import { isJwtExpired } from "jwt-check-expiration";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UseJwtTokenExpiration = () => {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  useEffect(() => {
    const token = getTokenFromLocalStorage();
    try {
      if (isJwtExpired(token)) {
        console.log("token is expired");
        //perform other operation
        setFlag(true);
        toast.error("Session Expired !! Relogin");
        logout();
        navigate("/login");
      }
    } catch (error) {}
  }, []);

  return flag;
};

export default UseJwtTokenExpiration;
