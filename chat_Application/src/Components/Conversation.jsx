import React from 'react';
import './myStyles.css';
import { useNavigate } from 'react-router-dom';
import { setSelectedChat, setShowChatArea } from '../redux/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import GroupsIcon from '@mui/icons-material/Groups';


function ConversationItem({props}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {isSmallScreen}=useSelector((state)=>state.chat)
  const handleNavigation=(user)=>{
      
  if(isSmallScreen){
    dispatch(setShowChatArea(true));
  }

    dispatch(setSelectedChat(user));
    navigate(`chat/${props?._id}`)
  }
  
  return (
    <div className='conversation-container' onClick={()=>handleNavigation(props)} >
        
    {props.chatName === "sender" ? (
      <>
        <p className='con-icon'>{props?.users[0]?.name.charAt(0)}</p>
        <h5 className='con-title'>{props?.users[0]?.name}</h5>
        <h6 className='con-latestMessage'>{props?.latestMessage?.content}</h6>
        <p className='con-timeStamp'>{props.timeStamp}</p>
       
         </>
      ) : (
        <>
        <p className='con-icon'><GroupsIcon/></p>
        <h5 className='con-title'>{props?.chatName}</h5>
        <h6 className='con-latestMessage'>{props?.latestMessage?.content}</h6>
        <p className='con-timeStamp'>{props.timeStamp}</p>
        </>
      )}
    </div>
  )
}
export default ConversationItem