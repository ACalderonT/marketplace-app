import axios from "axios";

const BASE_URL = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_LOCAL_API_URL}:${import.meta.env.VITE_API_PORT}`;

export const getAllProducts = async (page, filters) => {
    try{
        const url = `${BASE_URL}/posts?page=${page}`;
        const response = await axios.get(url, {
            params: filters
        })
        
        return response.data
    }catch(error){
        console.error(error)
    }
}

export const getProductById = async (productId) => {
    try{
        const url = `${BASE_URL}/posts/${productId}`;
        const response = await axios.get(url)

        return response.data
    }catch(error){
        console.error(error);
    }
}

export const getAllCategories = async () => {
    try{
        const url = `${BASE_URL}/categories`;
        const response = await axios.get(url)

        return response.data
    }catch(error){
        console.error(error)
    }
}

export const getAllBrands = async () => {
    try{
        const url = `${BASE_URL}/brands`
        const response = await axios.get(url)

        return response.data
    }catch(error){
        console.error(error)
    }
}

export const getPriceLimits = async () => {
    try{
        const url = `${BASE_URL}/price`
        const response = await axios.get(url)

        return response.data
    }catch(error){
        return error
    }
}