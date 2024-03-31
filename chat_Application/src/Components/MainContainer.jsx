import React, { useEffect, useState } from 'react'
import './myStyles.css';
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSmallScreen,setShowChatArea } from '../redux/chatSlice'
import SideBar from './SideBar'

function MainContainer() {

  const dispatch = useDispatch();
  const isSmallScreen = useSelector(state => state?.chat?.isSmallScreen);
  const showChatArea = useSelector(state => state?.chat?.showChatArea);


  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsSmallScreen(window.innerWidth < 768)); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
   
  return (
    <div className='main-container'>
        
        {isSmallScreen&& !showChatArea&&<SideBar />}
        {isSmallScreen&&showChatArea&&<Outlet/>}

        {!isSmallScreen && <SideBar />} 
      {!isSmallScreen && <Outlet />} 
    </div>
  )
}

export default MainContainer