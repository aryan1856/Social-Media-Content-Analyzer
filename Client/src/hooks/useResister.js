import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { UseAuthContext } from "../context/authContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth } = UseAuthContext();

  const register = async (username, password, confirmPassword) => {
    const valid = validateInput(username, password, confirmPassword);
    if (!valid) return;

    setLoading(true);

    try {
      const base = import.meta.env.VITE_BACKEND_URL;
      const reqAPI = import.meta.env.VITE_AUTH_BASE_URL;

      const res = await axios.post(`${base}${reqAPI}/register`, {
        username,
        password,
        confirmPassword,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      localStorage.setItem("curr-user", res.data.user.username);
      localStorage.setItem("token", res.data.token);

      // FIXED
      setAuth(res.data.user);

      toast.success("User registered successfully");
    } catch (error) {
      console.log("Register error:", error.response?.data);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

function validateInput(username, password, confirmPassword) {
  if (!username || !password || !confirmPassword) {
    toast.error("All fields are required");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords must match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}

export default useRegister;
