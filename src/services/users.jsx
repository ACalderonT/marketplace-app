import axios from "axios"

export const createUser = async (payload) => {
    try{
        const url = `http://localhost:3000/account`

        const response = await axios.post(url, payload);
        console.log("response: ", response);
        console.log("payload: ", payload);

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