import axios from "axios";

export const getAllProducts = async () => {
    try{
        const url = `http://localhost:3000/posts`;
        const response = await axios.get(url)
        
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