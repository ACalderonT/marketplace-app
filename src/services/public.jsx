import axios from "axios";

export const getAllProducts = async (page, filters) => {
    try{
        const url = `http://localhost:3000/posts?page=${page}`;
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
        const url = `http://localhost:3000/posts/${productId}`;
        const response = await axios.get(url)

        return response.data
    }catch(error){
        console.error(error);
    }
}

export const getAllCategories = async () => {
    try{
        const url = `http://localhost:3000/categories`;
        const response = await axios.get(url)

        return response.data
    }catch(error){
        console.error(error)
    }
}

export const getAllBrands = async () => {
    try{
        const url = `http://localhost:3000/brands`
        const response = await axios.get(url)

        return response.data
    }catch(error){
        console.error(error)
    }
}

export const getPriceLimits = async () => {
    try{
        const url = `http://localhost:3000/price`
        const response = await axios.get(url)

        return response.data
    }catch(error){
        return error
    }
}