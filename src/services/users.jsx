import axios from "axios";

export const createUser = async (payload) => {
    try{
        const url = `http://localhost:3000/account`

        const response = await axios.post(url, payload);

        return response.data
    }catch(error){
        return error.response.data
    }
}

export const userLogIn = async (payload) => {
    try{
        const url = `http://localhost:3000/login`

        const response = await axios.post(url, payload)

        return response.data
    }catch(error){
        return error.response.data
    }
}

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
        console.log(error)
        return error
    }
}