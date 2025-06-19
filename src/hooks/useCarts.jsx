import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useCarts = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: carts = [], refetch, isLoading } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/carts/${user.email}`)
            return data;
        }
    })

    return [carts, refetch, isLoading]
};

export default useCarts;