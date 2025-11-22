import React from 'react'
import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            {
                (isLogin)
                    ?
                    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                        <Login setIsLogin={setIsLogin}/>
                    </div>
                    :
                    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                        <Register setIsLogin={setIsLogin}/>
                    </div>
            }
        </>
    )
}

export default Auth;