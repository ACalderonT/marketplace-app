import axios from "axios";

export const createUser = async (payload) => {
    try{
        const url = `http://localhost:3000/account`

        const response = await axios.post(url, payload);

        return response.data
    }catch(error){
        return error.response.data
    }
};

export const userLogIn = async (payload) => {
    try{
        const url = `http://localhost:3000/login`

        const response = await axios.post(url, payload)

        return response.data
    }catch(error){
        return error.response.data
    }
};

export const getUser = async (authToken) => {
    try{
        const url = `http://localhost:3000/profile/account`

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
        const url = `http://localhost:3000/profile/posts`;

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
        const url = `http://localhost:3000/profile/favorites`;

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

export const createNewPost = async (authToken, payload) => {
    try{
        const url = `http://localhost:3000/profile/posts`

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

export const removePost = async (authToken, product_id) => {
    try{
        const url = `http://localhost:3000/profile/posts/${product_id}`

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

export const updateUserInformation = async (authToken, payload) => {
    try{
        const url = ``

        const response = await axios.put(url, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            payload
        })

        return response
    }catch(error){
        console.error(error);
        return error
    }
}