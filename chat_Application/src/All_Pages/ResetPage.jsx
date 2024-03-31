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
import '../Components/myStyles.css'
import { useState } from 'react';
import { ResetPassword } from '../Services/centralAPI';
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

export default function Reset() {

  const navigate=useNavigate();
 const dispatch=useDispatch();
  const [user,setUser]=useState({
    password:"" 
  
  });
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      console.log(user)
      const response = await ResetPassword(user,token);
      console.log(response)
      const token=response.data.jwttoken
      const id=response.data.user
      console.log(token)
  
  
    navigate('/')
      
    } catch (error) {
      console.log(error);
      
    }
   
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" fixed={true}  className='login'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              onChange={(e)=>setUser({...user,[e.target.name]: e.target.value })}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  SignIn
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}