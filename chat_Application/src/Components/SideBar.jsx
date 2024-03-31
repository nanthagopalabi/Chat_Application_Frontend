import React, { useEffect, useState } from 'react';
import './myStyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ConversationItem from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { createChat,getAllChat,searchUserApi } from '../Services/centralAPI';
import { openCreateGroup, setsearchUsers, setMyChats, toggleSearch } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserGroups from './UserGroup';

function SideBar() {

const {myChats}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const searchUsers=useSelector((state)=>state?.chat?.searchUsers)
const navigate=useNavigate();
const [user,setUser]=useState(null);
const [groupUser,setGroupUser]=useState({name:'',userName:''});
const dispatch=useDispatch();
const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    dispatch(openCreateGroup());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const handleCreation=async(userId)=>{
    try {
      const data=await createChat(userId,token);
      console.log(data)
       if(data.status==200){
         // Update myChats state to include the newly created chat
      dispatch(setMyChats([...myChats, data.data]));
        navigate(`chat/${data?.data?._id}`)
       }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(()=>{
    const fetchData=async()=>{
      try {
        const data=await searchUserApi(user,token);
        console.log(data.data);
        console.log(searchUsers);
          dispatch(setsearchUsers(data.data))
          console.log(searchUsers)
        
      } catch (error) {
        console.log(error);
      }
    }
    if(user){
      fetchData();
    }
    
    useEffect(()=>{
    const fetchChat=async()=>{
      try {
        const data=await getAllChat(token);
        console.log(data)
        dispatch(setMyChats(data.data))
        
      } catch (error) {
        console.log(error);
      }
    }
    if(!user){
   fetchChat();}
  },[user, dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && !user) {
      // Dispatch an action to clear the search results
      dispatch(setsearchUsers([]));
    }
  };

useEffect(()=>{
  const fetchData=async()=>{
    try {
      
      const data=await searchUserApi(groupUser?.userName,token);
      console.log(data.data);
      console.log("searching")
        setSuggestion([...data.data])
      
    } catch (error) {
      console.log(error);
    }
  }
  
  if(groupUser.userName){
    fetchData();
  }

},[groupUser.userName])  

const logout=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user');
  navigate('/');
}
  
  return (
    <div className='sidebar-container'>
      <div className='sb-header'>
      <div>
      <IconButton onClick={handleOpenMenu}>
      <AccountCircleIcon/>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseUser} >
        {/* Menu Items */}
        <MenuItem onClick={logout}>Logout</MenuItem>
       </Menu>
      </div>
    <div>
    <IconButton onClick={()=>dispatch(toggleSearch())}>
     <PersonAddAlt1Icon/>
    </IconButton>
    <IconButton>
     <GroupAddIcon/>
    </IconButton>
    <IconButton onClick={handleClickOpen}>
     <AddCircleIcon/>
    </IconButton>
    </div>
    </div>
    <div className='sb-searchBar'>
    <IconButton>
     <SearchIcon/>
     </IconButton>
     <input type='text' placeholder='search' className='searchbox'
        onChange={(e)=>setUser(e.target.value)}  onKeyDown={handleKeyDown} />
     
    </div>
    <div>    <ul className='suggestion-list'>
    
       {searchUsers?.length>0 && searchUsers?.map((ele)=> (
         <li key={ele?._id}  onClick={()=>handleCreation(ele?._id)}>{ele?.name}</li>
       ))}
     </ul>
     </div>
 
    <div className='sb-conversations'>
    {myChats.map((ele,i)=>{
     
     return <ConversationItem props={ele} key={ele._id}  />
    })}
   </div>
    <UserGroups/>
   </div>
   )
 }
 export default SideBar