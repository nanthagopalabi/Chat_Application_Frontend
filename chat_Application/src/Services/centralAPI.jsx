import axios from 'axios';


const API_URL = "https://gmail-clone-backend-z2zd.onrender.com";


export const RegisterUser = async (payload) => {
    const response = await axios.post(`${API_URL}/api/register`, payload);
    return response;
};

export const LoginUser = async (payload) => {
    const response = await axios.post(`${API_URL}/api/login`, payload);
    return response;
};

export const ForgetPassword = async (payload) => {
    const response = await axios.post(`${API_URL}/user/forget`, payload);
    return response;
};

export const ResetPassword = async (payload,resetToken) => {
    const response = await axios.post(`${API_URL}/user/reset/${resetToken}`, payload);
    return response;
};
export const searchUserApi = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.get(`${API_URL}/api/alluser?search=${payload}`,{headers});
    return response;
};
export const createChat = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.post(`${API_URL}/chat/`,{userId:payload},{headers});
    return response;
};

export const getAllChat = async (authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.get(`${API_URL}/chat/`,{headers});
    return response;
};
export const getChat = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.get(`${API_URL}/message/${payload}`,{headers});
    return response;
};

export const sendMessage = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.post(`${API_URL}/message/`,payload,{headers});
    return response;
};