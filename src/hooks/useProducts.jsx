import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useProducts = ({category}) => {
    const axiosPublic = useAxiosPublic();
    const searchCategory = category || "";
    
    const {data:products=[], isLoading, refetch} = useQuery({
        queryKey: ["products", category],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/products?category=${searchCategory}`)
            return res?.data;
        }
    })
    return [products, isLoading, refetch]
};

export default useProducts;