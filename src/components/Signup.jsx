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

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  const { username, password, email } = user;

  const [isRegistered, setIsRegistered] = useState(false);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/signup', user);
      setIsRegistered(true);
      setTimeout(() => {
        setIsRegistered(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Signup failed:', error);
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
            Signup
          </Typography>

          {isRegistered && (
            <Dialog open={isRegistered} onClose={() => setIsRegistered(false)}>
              <DialogTitle>Success</DialogTitle>
              <DialogContent>Signup success!</DialogContent>
              <DialogActions>
                <Button onClick={() => setIsRegistered(false)} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          )}

          <TextField
            fullWidth
            label="UserName"
            name="username"
            value={username}
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
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
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
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
