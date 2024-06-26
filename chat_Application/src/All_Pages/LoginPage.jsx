import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../Components/myStyles.css';
import { useState } from 'react';
import { LoginUser } from '../Services/centralAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../redux/chatSlice'
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
  },
});

export default function SignIn() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [user,setUser]=useState({
    email:"",
    password:"" 
  
  });
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
    
      const response = await LoginUser(user);
      console.log(response)
      const token=response.data.jwttoken
      const id=response.data.user
      console.log(token)
   dispatch(setUserToken({token}));
   localStorage.setItem("token",JSON.stringify(token))
   localStorage.setItem("user",JSON.stringify(id));
    navigate('/app/welcome')
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Container className="mainContainer">
      <img className="imgLogin" src="https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?w=740&t=st=1711694562~exp=1711695162~hmac=046a9af56be91df00e4c40d9fd166918cd1f24501a10c45876d0a66b587ca0ba"/>
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" fixed={true}  className='login'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}/>
              <Typography>Demo Email: demo@gmail.com</Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              onChange={(e)=>setUser({...user,[e.target.name]: e.target.value })}/>
              <Typography>Demo Password: 12345678</Typography>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"/>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>Log In</Button>

            <Grid container>
              <Grid item xs>
                <Link href="/forget" variant="body2">Forgot password?</Link>
            </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Click Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Container>
    </>
  );
}