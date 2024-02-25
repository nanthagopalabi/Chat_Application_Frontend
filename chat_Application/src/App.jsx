import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'; 
import Register from './All_Pages/RegisterPage';
import SignIn from './All_Pages/LoginPage';
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
      {/* <Route path='create-group' element={<CreateGroup/>}/> */}

      </Route>

      <Route path='/register' element={<Register/>
      }/>
    </Routes>
      
    </div>
  
   

    </>
  )
}
export default App