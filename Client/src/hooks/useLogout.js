import React, {useState} from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import { UseAuthContext } from '../context/authContext';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuth} = UseAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const base = import.meta.env.VITE_BACKEND_URL;
            const reqAPI = import.meta.env.VITE_AUTH_BASE_URL;
            const res = await axios.post(`${base}${reqAPI}/logout`, {}, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if(!res.data.success){
                toast.error(res.data.message);
                return;
            }
            
            localStorage.removeItem('curr-user');
            localStorage.removeItem('token');
            setAuth(null);
            toast.success("Logout Successful");
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        } finally{
            setLoading(false);
        }
    }
    return {loading, logout};
}

export default useLogout;