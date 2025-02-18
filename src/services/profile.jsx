import axios from "axios";

const BASE_URL = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_LOCAL_API_URL}:${import.meta.env.VITE_API_PORT}`;

export const createUser = async (payload) => {
    try{
        const url = `${BASE_URL}/account`

        const response = await axios.post(url, payload);

        return response.data
    }catch(error){
        return error.response.data
    }
};

export const userLogIn = async (payload) => {
    try{
        const url = `${BASE_URL}/login`

        const response = await axios.post(url, payload)

        return response.data
    }catch(error){
        return error.response.data
    }
};

export const getUser = async (authToken) => {
    try{
        const url = `${BASE_URL}/profile/account`

        const response = await axios.get(url, { 
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return response
    }catch(error){
        console.error(error)
        return error
    }
};

export const getUserPosts = async (creatorId, authToken) => {
    try{
        const url = `${BASE_URL}/profile/posts`;

        const response = await axios.get(url, {
            params: {
                creator_id: creatorId
            },
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
    
        return response.data
    }catch(error){
        console.error(error);
        return error
    }
};

export const getFavoriteUserPosts = async (userId, authToken) => {
    try{
        const url = `${BASE_URL}/profile/favorites`;

        const response = await axios.get(url, {
            params: {
                user_id: userId
            },
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return response.data
    }catch(error){
        console.error(error);
        return error;
    }
};

export const createFavoritePost = async (userId, postId, authToken) => {
    try{
        const url = `${BASE_URL}/posts/favorite`
        const response = axios.post(url, {
            params: {
                user_id: userId,
                post_id: postId
            },
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return response.data
    }catch(error){
        console.error(error)
        return error
    }
}

export const removeFavoritePost = async (userId, postId, authToken) => {
    try{
        const url = `${BASE_URL}/posts/favorite`
        const response = axios.delete(url, {
            params: {
                user_id: userId,
                post_id: postId
            },
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return response.data
    }catch(error){
        console.error(error)
        return error
    }
}

export const createNewPost = async (authToken, payload) => {
    try{
        const url = `${BASE_URL}/profile/posts`

        const response = await axios.post(url, 
            {
                payload
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

        return response.data
    }catch(error){
        console.error(error);
        return error
    }
};

export const updatePost = async (authToken, product_id, payload) => {
    try{
        const url = `${BASE_URL}/profile/posts/${product_id}`;

        const response = await axios.put(url, payload,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return response.data
    }catch(error){
        console.error(error)
        return error
    }
}

export const removePost = async (authToken, product_id) => {
    try{
        const url = `${BASE_URL}/profile/posts/${product_id}`

        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return response.data
    }catch(error){
        console.error(error);
        return error
    }
}

export const updateUserInformation = async (id, authToken, payload) => {
    try{
        const url = `${BASE_URL}/profile/account/${id}`

        const response = await axios.put(url, payload, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })

        return response.data
    }catch(error){
        console.error(error);
        return error
    }
}