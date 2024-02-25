import React, { useEffect, useState } from 'react';
import './myStyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import {  Button, IconButton } from '@mui/material';
import ConversationItem from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { createChat,getAllChat,searchUserApi } from '../Services/centralAPI';
import { setsearchUsers } from '../redux/chatSlice';
import { setMyChats } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav,InputGroup,Form,Image, Row, Col} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import NavBar from './NavBar';
import Welcome from '../All_Pages/Welcome';
import Pill from './Pill';

function SideBar() {

const {myChats}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const searchUsers=useSelector((state)=>state.chat.searchUsers)
const navigate=useNavigate();
const [user,setUser]=useState(null);
const [groupUser,setGroupUser]=useState({name:'',userName:''});
const [suggestion,setSuggestion]=useState([]);
const [selected,setSelected]=useState([]);
const [isDarkTheme, setIsDarkTheme] = useState(false);

const dispatch=useDispatch();

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreation=async(userId)=>{
    try {

       const data=await createChat(userId,token);
      console.log(data)
       if(data.status==200){
        
        navigate(`chat/${data.data._id}`)
       }
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
   
    const fetchData=async()=>{
      try {
        
        const data=await searchUserApi(user,token);
        console.log(data.data);
        console.log(searchUsers)
          dispatch(setsearchUsers(data.data))
          console.log(searchUsers)
        
      } catch (error) {
        console.log(error);
      }
    }
    if(user){
      fetchData();
    }

    const fetchChat=async()=>{
      try {
        const data=await getAllChat(token);
        dispatch(setMyChats(data.data))
        
      } catch (error) {
        console.log(error);
        
      }
    }
   fetchChat();

  },[user]);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && !user) {
      // Dispatch an action to clear the search results
      dispatch(setsearchUsers([]));
    }
  };

useEffect(()=>{
  const fetchData=async()=>{
    try {
      
      const data=await searchUserApi(groupUser.userName,token);
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

useEffect(() => {
  document.body.classList.toggle('dark-theme', isDarkTheme);
}, [isDarkTheme]);

const handleThemeSwitch = () => {
  setIsDarkTheme(!isDarkTheme);
};
  
  return (
    // <div className='sidebar-container'>
    //     <NavBar/>

    // {/* <Row className='rows'> */}
  
    // <Col className='sidebar' md={4}>
    <div className='sidebar-container'>


    <div className='sb-header'>
    <div>
    <IconButton>
    <AccountCircleIcon/>
    </IconButton>
    </div>
    <div>
    <IconButton>
    <PersonAddAlt1Icon/>
    </IconButton>
    <IconButton>
    <GroupAddIcon/>
    </IconButton>
    <IconButton onClick={handleClickOpen}>
    <AddCircleIcon/>
    </IconButton>
    <IconButton  onClick={handleThemeSwitch}>
    {/* <NightlightIcon/> */}
    </IconButton>
    </div>
    </div>
    <div className='sb-searchBar'>
    <IconButton>
     <SearchIcon/>
     </IconButton>
     <input type='text' placeholder='search' className='searchbox'
 
       onChange={(e)=>setUser(e.target.value)}
       onKeyDown={handleKeyDown}
     />
     
    </div>
    <div>    <ul className='suggestion-list'>
    
       {searchUsers.length>0&&searchUsers?.map((ele)=> (
         <li key={ele._id}  onClick={()=>handleCreation(ele._id)}>{ele.name}</li>
       ))}
     </ul>
     </div>
 
    <div className='sb-conversations'>
    {myChats.map((ele,i)=>{
     
     return <ConversationItem props={ele} key={ele._id}  />
    })}
    
     
 
       
    </div>
 
    <Dialog
         open={open}
         onClose={handleClose}
         PaperProps={{
           component: 'form',
           onSubmit: (event) => {
             event.preventDefault();
             
             
             handleClose();
           },
         }}
       ><DialogTitle>Subscribe</DialogTitle>
         <DialogContent>
           <DialogContentText>
            Create a New Group
           </DialogContentText>
           <TextField
             autoFocus
             required
             margin="dense"
             id="name"
             name="name"
             label="Group Name"
             type="text"
             fullWidth
             variant="standard"
             value={groupUser.name}
             onChange={(e) => setGroupUser({ ...groupUser, [e.target.name]: e.target.value})}
           />
           
           <TextField
             autoFocus
             required
             margin="dense"
             id="user"
             name="userName"
             label="Users"
             type="text"
             fullWidth
             variant="standard"
             value={groupUser.userName}
             onChange={(e) => setGroupUser({ ...groupUser, [e.target.name]: e.target.value })}  
             InputProps={{
         startAdornment: (
             <span className="start-adornment">{selected.length>0&&selected.map((ele)=>{
               <Pill />
             })} </span>
         ),
     }}         
           />
            <ul className='suggestion-list'>
    
    {suggestion.length>0&&suggestion?.map((ele)=> (
      <li key={ele._id} >{ele.name}</li>
    ))}
  </ul>
         </DialogContent>
       
        
         <DialogActions>
        
           <Button onClick={handleClose}>Cancel</Button>
           <Button type="submit">Create</Button>
         </DialogActions>
       </Dialog>
 
 
     </div>
   )
 }
 export default SideBar