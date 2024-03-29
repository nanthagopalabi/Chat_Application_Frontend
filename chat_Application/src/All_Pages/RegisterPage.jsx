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
import { useState } from 'react';
import { RegisterUser } from '../Services/centralAPI';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
  },
});

export default function Register() {
  const navigate = useNavigate(); 

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(user);
      const response = await RegisterUser(user);
      if (response.status) {
        navigate('/'); 
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <>
    <Container className="mainContainer">
      <img className="imgLogin" src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1711701372~exp=1711704972~hmac=c0f378617b4ea536c40cc88b212238f14c146b3bd92067e21d5c26ec913f0065&w=740"/>
  
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" fixed={true} className='login'>
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}> Sign Up </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already Registered? Log In"}
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
