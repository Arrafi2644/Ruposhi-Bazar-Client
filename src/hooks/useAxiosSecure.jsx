import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: 'https://vital-meds-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosPublic;
};

export default useAxiosSecure;