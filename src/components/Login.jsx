import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    usernameorEmail: '',
    password: '',
  });

  const { usernameorEmail, password} = user;

  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', user);
  
      const userId = response.data.userId
      const role = response.data.roles[0].name;
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);      


      setIsLoggedIn(true);
      setIsLogin(true);
      
      setTimeout(() => {
        setIsLogin(false);
        navigate(`/`);
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box
          component="form"
          onSubmit={(e) => onSubmit(e)}
          border="1px solid"
          borderRadius="16px"
          p={4}
          maxWidth="400px"
          width="100%"
        >
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>

          {isLogin && (
            <Dialog open={isLogin} onClose={() => setIsLogin(false)}>
              <DialogTitle>Success</DialogTitle>
              <DialogContent>Login success!</DialogContent>
              <DialogActions>
                <Button onClick={() => setIsLogin(false)} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          )}

          <TextField
            fullWidth
            label="UserName OR Email"
            name="usernameorEmail"
            value={usernameorEmail}
            onChange={(e) => onInputChange(e)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => onInputChange(e)}
            margin="normal"
            variant="outlined"
          />
          <Box textAlign="center" mt={2}>
            <Button type="submit" variant="contained" color="primary" mr={2}>
              Submit
            </Button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </Link>
          </Box>
          <Box textAlign="center" mt={2}>
            <Link to="/Signup">No account? Signup</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
