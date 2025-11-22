import React, {useState} from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import { UseAuthContext } from '../context/authContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuth} = UseAuthContext();

    const login = async (username, password) => {
        if(!username || !password){
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
            const base = import.meta.env.VITE_BACKEND_URL;
            const reqAPI = import.meta.env.VITE_AUTH_BASE_URL;
            const res = await axios.post(`${base}${reqAPI}/login`, {username, password});
            console.log(res);
            if(!res.data.success){
                toast.error(res.data.message);
                return;
            }
            localStorage.setItem('curr-user', res.data.user.username);
            localStorage.setItem('token', res.data.token);
            setAuth(res.data.user);
            toast.success("Login Successfull");
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    return {loading, login};
}

export default useLogin;