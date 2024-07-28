import axios from "axios"

export const createUser = async (payload) => {
    const url = `http://localhost:3000/account`

    try{
        const response = await axios.post(url, payload);
        console.log(response.data);
        return response.data
    }catch(error){
        return error.response.data
    }
}