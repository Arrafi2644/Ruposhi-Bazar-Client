import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isAdmin , isPending: adminPending, isLoading} = useQuery({
        
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async() => {
            
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            // console.log("RES", res);
            return res.data;
        }
    })


    return [isAdmin, adminPending, isLoading]
};

export default useAdmin;