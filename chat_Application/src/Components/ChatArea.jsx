import React, { useEffect, useRef, useState } from 'react'
import './myStyles.css';
import SendIcon from '@mui/icons-material/Send';
import { IconButton,Menu, MenuItem } from '@mui/material';
import MsgFromSelf from './MsgFromSelf';
import MsgToOthers from './MsgToOthers';
import { createChat,getChat,sendMessage } from '../Services/centralAPI';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { setAllMessages, setEmpty, setSelectedChat, setSingleMessage,setShowChatArea,setNewMessage, setAddUsertoGroup, toggleRemoveUser, toggleGroupName } from '../redux/chatSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import '../App.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const socket = io("https://chat-application-n6ij.onrender.com");

function ChatArea() {

  const dispatch = useDispatch();
  const {allMessages, addUserToGroup, message}=useSelector((state)=>state.chat);
  const {selectedChat,showChatArea}=useSelector((state)=>state.chat);
  const token=JSON.parse(localStorage.getItem('token'));
  const id=JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);      

  const {chatId}=useParams();
  // const [message,setMessage]=useState({content:''});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const dummy={
    name:"hello",
    lastMessage:"hi1",
    timeStamp:"today"
  }

const handleSend=async()=>{
  try {

    if (!message.content.trim()) {
      return;
    }
    let resetCopy={...message}
    
    let msg={...resetCopy,_id:chatId,sender:{_id:id}}
    console.log(id)
    
    dispatch(setSingleMessage(msg));
    
    scrollToBottom(); 
    socket.emit("new message",msg)
    dispatch(updateMessageContent(''));

    const data=await sendMessage({...resetCopy,chatId:chatId},token);
    console.log(data)
    
  } catch (error) {
    console.log(error)    
  }
}

  useEffect(()=>{
    const fetchChat=async()=>{
      try {
        const token=JSON.parse(localStorage.getItem('token'));
        dispatch(setEmpty());
        const data=await getChat(chatId,token);
        console.log(data);
       
        dispatch(setAllMessages(data.data));
        dispatch(setSelectedChat(data.data[0]?.chat));
        socket.emit("setup", { data: { id: id } }); 
       
      } catch (error) {
        console.log(error)
      }
    }
    fetchChat();
    
    return ()=>{
      dispatch(setEmpty());
    }
  },[chatId]);

  useEffect(() => {
    socket.emit("join chat", chatId);
    socket.on("message received", (msg) => {
      dispatch(setNewMessage(msg));
      dispatch(setSingleMessage(msg));
    });
   
    return () => {
      socket.off("message received"); // Cleanup event 
    };
  }, [chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  };

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", { chatId, isTyping: false }); // Emit typing status
    }, 1000); // Change this delay as needed
    return () => clearTimeout(typingTimeout);
  }, [message.content]);

  const handleUserTyping = () => {
    setIsTyping(true);
    socket.emit("typing", { chatId, isTyping: true }); // Emit typing status
  };

  useEffect(() => {
     scrollToBottom(); 
  }, [allMessages]);

  const handleAddUser=()=>{
    dispatch(setAddUsertoGroup());
    handleClose();
  }

  const handleRemoveUser=()=>{
    dispatch(toggleRemoveUser());
    handleClose();
  }
  
  const handleGroupNameChange=()=>{
    dispatch(toggleGroupName());
    handleClose();
  }

  const formatDate = (date) => {
    try {
      // Attempt to parse the date string
      const parsedDate = new Date(date);
      
      // Check if the parsed date is valid
      if (!isNaN(parsedDate)) {
        // Return the formatted date
        return parsedDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } else {
       
        return moment().format();;
      }
    } catch (error) {
      
      console.error("Error formatting date:", error);
      return "Error";
    }
  };
  

  const handleTyping = (e) => {
    if (e.key === "Enter") {
      handleSend();
      return
    }
    
    dispatch(updateMessageContent((e.target.value)));
    
  };

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      console.log("Online Users:", users);
      
    });
  
    return () => {
      // Cleanup function to remove the event listener when the component unmounts
      socket.off("onlineUsers");
    };
  }, []);


  return (
    <div className='chatarea-container'>
        <div className='chatheader-container'>

        {showChatArea&&<IconButton onClick={()=>dispatch(setShowChatArea(false))}>
            <KeyboardBackspaceIcon/>
          </IconButton>}
        
          <p className='con-icon'>{!selectedChat?.isGroupChat &&<img />}</p>
        
          <div className='header-text'>
            <p className='con-title '>{selectedChat && selectedChat?.chatName !== 'sender' ?
            (selectedChat?.chatName):
            (selectedChat && selectedChat.users?.length > 0 && selectedChat?.users[1]?.name)}</p>
            <p className='con-timeStamp'>{dummy.timeStamp}</p>
          </div>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon/>
          </IconButton>
          {selectedChat?.chatName!=='sender'&&
          <Menu  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
           <MenuItem onClick={handleAddUser}>Add a User</MenuItem>
           <MenuItem onClick={handleRemoveUser}>Remove User</MenuItem>
           <MenuItem onClick={handleGroupNameChange}>Change Group Name</MenuItem>
          </Menu>
          }
        </div>

        <div className='message-container' >
         {allMessages.length>0 &&allMessages.map((ele,index)=>{

          // Calculate the date for the current message
      const currentDate = formatDate(ele.createdAt);

      // Determine if it's a new date compared to the previous message
      const previousMessage = index > 0 ? allMessages[index - 1] : null;
      const previousDate = previousMessage ? formatDate(previousMessage.createdAt) :null;
      const isNewDate = currentDate !== previousDate || index === 0; // Add index === 0 check for the first message

      // Check if it's the last message
      const isLastMessage = index === allMessages.length - 1;
      return (
          <div ref={messagesEndRef}  key={nanoid()}>
          {isNewDate && <div className="date-header">{currentDate}</div>}          
          
          {ele.sender._id===id?(<MessagefromSelf content={ele} />)
         :
         (<MessagetoOthers content={ele}  />)}
         </div>
         
         )})}
        </div>
        <div className='input-container'>
        <input type='text' placeholder='Type a Message' className='searchbox'
          value={message?.content||""}
          onChange={(e) => dispatch(updateMessageContent(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
      handleSend();}
    }} />

        <IconButton onClick={()=>handleSend()}>
          <SendIcon/>
        </IconButton>
        </div>
       {/* <AddUser/>
       <RemoveUser/>
       <RenameGroup/> */}
    </div>
  )
}
export default ChatArea