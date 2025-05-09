import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';


const useAuth = () => {
    const authInfo = useContext(AuthContext)
    console.log("auth Info", authInfo);
    return authInfo;
};

export default useAuth;