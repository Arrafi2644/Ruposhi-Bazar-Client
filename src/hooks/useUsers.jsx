import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
      const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data:users=[], isLoading, refetch} = useQuery({
        queryKey: ["users"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res?.data;
        }
    })
    return [users, isLoading, refetch]
};

export default useUsers;