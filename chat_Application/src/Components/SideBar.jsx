import React, { useEffect, useState } from 'react'
// import './myStyles.css'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import {  Button, IconButton } from '@mui/material';
// import ConversationItem from './Conversation';
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

function SideBar() {

const {myChats}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const searchUsers=useSelector((state)=>state.chat.searchUsers)
const navigate=useNavigate();
const [user,setUser]=useState(null);
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
        console.log(data,"hjello")
        dispatch(setMyChats(data.data))
        
      } catch (error) {
        console.log(error);
        
      }
    }
   fetchChat();

  },[user]);
  

  
  return (
    <div className='sidebar-container'>
        <NavBar/>

    <Row className='rows'>
  
   {/* <div className='sb-searchBar'>
   <IconButton>
    <SearchIcon/>
    </IconButton>
    <input type='text' placeholder='search' className='searchbox'

      onChange={(e)=>setUser(e.target.value)}
    />
    
   </div> */}
    <Col className='sidebar' md={4}>
    <div className='sb-header'>
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
   <IconButton>
   <NightlightIcon/>
   </IconButton>
   </div>
   </div>
          <InputGroup className='search' hasValidation>
            <Form.Control placeholder="Search" type="text"/>
            <Button variant="primary"><FaSearch /></Button>
         </InputGroup>
    </Col>

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
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      ><DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>

      </Row>
    </div>
  )
}

export default SideBar