import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useAllOrders = () => {
       const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data:allOrders=[], isLoading, refetch} = useQuery({
        queryKey: ["orders"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/orders/admin/${user.email}`)
            return res?.data;
        }
    })
    return [allOrders, isLoading, refetch]
};

export default useAllOrders;