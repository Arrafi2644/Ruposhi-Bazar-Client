import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMyOrders = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data:orders=[], isLoading, refetch} = useQuery({
        queryKey: ["orders"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/orders/${user?.email}`)
            return res?.data;
        }
    })
    return [orders, isLoading, refetch]
};

export default useMyOrders;