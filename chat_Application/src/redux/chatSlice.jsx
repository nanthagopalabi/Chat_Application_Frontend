import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        user:{
            token:localStorage.getItem('token')||null,
            email:null
        },
        isSmallScreen: window.innerWidth <= 768,
        showChatArea: false,
        myChats: [],
        searchUsers: [],
        selectedChat:[],
        selectUser: "",
        selectForGrp: [],
        allMessages: [],
        newMessage: {},
        newArrivalMessage: {}
    },

    reducers:{
        setIsSmallScreen: (state, action) => {
            state.isSmallScreen = action.payload;
        },
        setShowChatArea: (state, action) => {
            state.showChatArea = action.payload;
        },

        setUserToken:(state,action)=>{
           
            state.user.token=action.payload
           

        },
        setMyChats:(state, action)=>{
            state.myChats = action.payload
        },
        setsearchUsers:(state, action)=>{
           
            state.searchUsers =action.payload
            console.log(state.searchUsers);
        },
        setSelectedChat:(state,action)=>{
            state.selectedChat=action.payload
        },
        setSelectUser:(state, action)=>{
            state.selectUser = action.payload
        },
        setSelectForGrp:(state, action)=>{
            state.selectForGrp = [...state.selectForGrp, action.payload]
        },
        removeSelectForGrp:(state, action)=>{
            state.selectForGrp = state.selectForGrp.filter((u)=> u._id !== action.payload._id)
        },
        setEmpty:(state)=>{
            state.selectForGrp = []
            state.searchUsers = []
            state.allMessages=[];
            state.selectedChat=[];
        },
        setAllMessages:(state, action)=>{
            const uniqueMessages = action.payload.filter(newMessage => {
                // Check if the _id of the new message already exists in the allMessages array
                return !state.allMessages.some(existingMessage => existingMessage._id === newMessage._id);
            });
        
            // Concatenate the unique messages with the existing messages in the state
            state.allMessages = [...state.allMessages, ...uniqueMessages];
            
        },
        setSingleMessage:(state, action)=>{
           
                state.allMessages.push(action.payload);

            
        },
        setNewMessage:(state, action)=>{
            state.newMessage = action.payload
        },

       
    }
});

export const { setIsSmallScreen,setShowChatArea,setUserToken,setMyChats,setSelectedChat, setsearchUsers, setSelectUser, setSelectForGrp, removeSelectForGrp, setEmpty, setAllMessages, setSingleMessage, setNewMessage } = chatSlice.actions
export default chatSlice.reducer