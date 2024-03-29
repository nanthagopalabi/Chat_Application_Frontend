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
        createGroup:false,
        addUserToGroup:false,
        removeUser:false,
        groupNameChange:false,
        myChats: [],
        searchUsers: [],
        selectedChat:[],
        selectUser: "",
        selectForGrp: [],
        allMessages: [],
        message: {content: ''},
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

        openCreateGroup:(state,action)=>{
            state.createGroup=true
        },

        closeCreateGroup:(state)=>{
            return {...state,createGroup:false}
        },

        setAddUsertoGroup:(state)=>{    
            state.addUserToGroup=!state.addUserToGroup         
        },

        toggleRemoveUser:(state)=>{
            state.removeUser=!state.removeUser
        },

        toggleSearch:(state)=>{
            state.searchPage=!state.searchPage
        },

        toggleGroupName:(state,action)=>{
            state.groupNameChange=!state.groupNameChange
        },

        setMyChats:(state, action)=>{
            state.myChats = action.payload
        },

        setsearchUsers:(state, action)=>{
            state.searchUsers =action.payload
        },

        updateMessageContent: (state, action) => {
            state.message.content = action.payload;
        },

        setSelectedChat:(state,action)=>{
            state.selectedChat=action.payload
        },

        removeUserSelectedChat:(state,action)=>{
            if (state.selectedChat) {
                // Filter out the user to be removed from the selected chat's users array
                state.selectedChat.users = state.selectedChat.users?.filter(user => user?._id !== action.payload._id);
            }
        },

        setGroupRename:(state,action)=>{
            if(state.selectedChat){
                state.selectedChat.chatName=action.payload
            }
        },

        setSelectUser:(state, action)=>{
            state.selectUser = action.payload
        },

        setSelectForGrp:(state, action)=>{
            state.selectForGrp = [...state.selectForGrp, action.payload]
        },

        removeSelectForGrp:(state, action)=>{
            state.selectForGrp = state.selectForGrp.filter((u)=> u._id !== action.payload?._id)
        },

        setEmpty:(state)=>{
            state.selectForGrp = [];
            state.searchUsers = [];
            state.allMessages=[];
            state.selectedChat=[];
        },

        setAllMessages:(state, action)=>{
            const uniqueMessages = action.payload.filter(newMessage => {
                // Check if the _id of the new message already exists in the allMessages array
                return !state.allMessages.some(existingMessage => existingMessage?._id === newMessage?._id);
            });
            state.allMessages = [...state.allMessages, ...uniqueMessages];
        },

        setSingleMessage: (state, action) => {
            // Modify this logic to ensure only serializable values are dispatched
            const { _id, sender, ...rest } = action.payload;
            state.singleMessage = { _id, sender, ...rest };    
            state.allMessages.push(action.payload);
        },

        setNewMessage:(state, action)=>{    
            state.myChats = state.myChats.map((chat) => {
                if (chat?._id === action.payload?._id) {
                    return {
                        ...chat,
                        latestMessage: action.payload
                    };
                } else {
                    return chat;
                }
            });
        },
    }
});

export const { setIsSmallScreen,openCreateGroup,closeCreateGroup,setAddUsertoGroup,updateMessageContent,
    toggleRemoveUser,removeUserSelectedChat,toggleGroupName,setGroupRename,setShowChatArea,toggleSearch,
    setUserToken,setMyChats,setSelectedChat, setsearchUsers,setSelectUser, setSelectForGrp,
    removeSelectForGrp, setEmpty, setAllMessages, setSingleMessage, setNewMessage } = chatSlice.actions

export default chatSlice.reducer