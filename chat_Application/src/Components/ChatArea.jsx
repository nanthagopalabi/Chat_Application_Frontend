import React, { useEffect, useRef, useState } from 'react'
// import './myStyles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
// import MessagefromSelf from './MessagefromSelf';
// import MessagetoOthers from './MessagetoOthers';
import { createChat,getChat,sendMessage } from '../Services/centralAPI';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { setAllMessages, setEmpty, setSelectedChat, setSingleMessage,setShowChatArea } from '../redux/chatSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const socket = io("https://gmail-clone-backend-z2zd.onrender.com");

function ChatArea() {

  const dispatch = useDispatch();
  const {allMessages}=useSelector((state)=>state.chat);
  const {selectedChat,showChatArea}=useSelector((state)=>state.chat);
  const token=JSON.parse(localStorage.getItem('token'));
  const id=JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);      

  const {chatId}=useParams();
  const [message,setMessage]=useState({content:''});
 
  // console.log(chatId)
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
    console.log(token)
    let resetCopy={...message}
    
    let msg={...resetCopy,_id:chatId,sender:{_id:id}}
    
    dispatch(setSingleMessage(msg));
    
    scrollToBottom(); 
    setMessage({ content: '' });
    socket.emit("new message",msg)

    
    
    const data=await sendMessage({...resetCopy,chatId:chatId},token);
    console.log(data)
    // msg._id=data.data.chat._id
    // msg.sender={...data.data.sender}
    // console.log(msg)
    
    
    
    
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
        dispatch(setSelectedChat(data.data[0].chat));
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
      
      dispatch(setSingleMessage(msg));
    
    });
   

    return () => {
      socket.off("message received"); // Cleanup event 
    };
  }, [chatId]);
  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      console.log("Online Users:", users);
      // Update your UI to display the list of online users
    });
  
    return () => {
      // Cleanup function to remove the event listener when the component unmounts
      socket.off("onlineUsers");
    };
  }, []);

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

  const handleTyping = () => {
    setIsTyping(true);
    socket.emit("typing", { chatId, isTyping: true }); // Emit typing status
  };


  

  useEffect(() => {
    console.log("All messages changed:", allMessages); 
    
     scrollToBottom(); 
  }, [allMessages]);


  return (
  
    <div className='chatarea-container'>
    
        <div className='chatheader-container'>

        {showChatArea&&<IconButton onClick={()=>dispatch(setShowChatArea(false))}>
            <KeyboardBackspaceIcon/>
          </IconButton>}
        
          <p className='con-icon'>{!selectedChat?.isGroupChat &&<img />}</p>
        
          <div className='header-text'>
            <p className='con-title '>{selectedChat.chatName!=='sender'?
            (selectedChat?.chatName): 
             (selectedChat &&selectedChat.users?.length>0&&selectedChat?.users[1]?.name)}</p>
            <p className='con-timeStamp'>{dummy.timeStamp}</p>
          </div>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </div>
        <div className='message-container' >
         {allMessages.length>0&&[...allMessages].map((ele)=>(  
          <div ref={messagesEndRef} key={ele?._id}>
          {ele.sender._id===id?(<MessagefromSelf content={ele.content} key={ele?._id}/>)
         :
         (<MessagetoOthers content={ele.content} key={ele?._id}/>)}
         </div>
          
         ))}
        </div>
        <div className='input-container'>
        <input type='text' placeholder='Type a Message' className='searchbox'
          value={message.content}
          onChange={(e) => {
            setMessage((prevState) => ({
    ...prevState,
    content: e.target.value
  }));
 
  } 
  }
  onKeyDown={() => {
        handleTyping();
    }}
        />
        <IconButton onClick={handleSend}>
          <SendIcon/>
        </IconButton>
        </div>
    </div>
  )
}

export default ChatArea