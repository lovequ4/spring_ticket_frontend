import { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MyTicket = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios.get(`http://localhost:8080/api/ticket/${userId}`)
        .then(response => {
          setTickets(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const handleDelete = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:8080/api/ticket/${ticketId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async (ticketId) => {
    const userId = localStorage.getItem("userId");
    try {
      await axios.post(`http://localhost:8080/api/checkout/${userId}?ticketId=${ticketId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center',marginTop:'50px'}}>
        My Tickets
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="ticket table">
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>Concert</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Artist</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Category</TableCell>
              <TableCell style={{ textAlign: 'center' }}>CategoryPrice</TableCell>
              <TableCell style={{ textAlign: 'center' }}> Quantity</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Total</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Venue</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Purchase Date</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Status</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Checkout</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(ticket => (
              <TableRow key={ticket.id}>
              <TableCell style={{ textAlign: 'center' }}>{ticket.title}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{ticket.artist}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{ticket.category.name}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{ticket.category.price}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{ticket.quantity}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{ticket.totalPrice}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{ticket.venue}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{new Date(ticket.purchaseDate).toLocaleString()}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{ticket.status}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button onClick={() => handleCheckout(ticket.id)}>Checkout</Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button onClick={() => handleDelete(ticket.id)} style={{ color: 'red' }}>Delete</Button>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyTicket;
