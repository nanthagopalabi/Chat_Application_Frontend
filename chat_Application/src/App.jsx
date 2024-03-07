import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'; 
import Register from './All_Pages/RegisterPage';
import SignIn from './All_Pages/LoginPage';
import Forget from './All_Pages/ForgetPage';
import MainContainer from './Components/MainContainer';
import Welcome from './All_Pages/Welcome';
import { useSelector } from 'react-redux';
import ChatArea from './Components/ChatArea';

function App() {
  const token=useSelector((state)=>state.chat.user.token);

  return (
    <>
    <div className='App' >
  
    <Routes>


      <Route exact path='/' element={<SignIn/>}/>
      <Route path='app' element={token?<MainContainer/>:<Navigate to='/' />}>
        <Route path='welcome' element={<Welcome/>}/>
        <Route path='chat/:chatId' element={<ChatArea/>}/>
      </Route>

      <Route path='/register' element={<Register/>}/>
      <Route path='/forget' element={<Forget/>}/>
      <Route path='/reset/:resetToken' element={<Forget/>} />
      <Route/>
     
    </Routes>
      
    </div>
  
   

    </>
  )
}
export default App