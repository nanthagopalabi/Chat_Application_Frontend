import axios from 'axios';

const API_URL = "https://chat-application-n6ij.onrender.com";

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
    const response = await axios.get(`${API_URL}/api/all_user?search=${payload}`,{headers});
    return response;
};

export const createChat = async (payload,authToken) => {
    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    try{
    const response = await axios.post(`${API_URL}/chat/`,{userId:payload},{headers});
    return response;
} catch (error) {
    console.error('Error creating chat:', error);
    throw error; // Rethrow the error to handle it elsewhere
}
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

export const newGroup = async (payload,authToken) => {
    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.post(`${API_URL}/chat/group`,payload,{headers});
    return response;
};

export const addNewUser = async (payload,authToken) => {
    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.put(`${API_URL}/chat/groupadd`,payload,{headers});
    return response;
};

export const RemoveUserApi = async (payload,authToken) => {
    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.put(`${API_URL}/chat/removeuser`,payload,{headers});
    return response;
};

export const GroupRenameApi = async (payload,authToken) => {
    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json',
    };
    const response = await axios.put(`${API_URL}/chat/rename`,payload,{headers});
    return response;
};