import { useEffect, useState} from 'react'
import axios from 'axios'  
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const Home = () => {

  const [concert,setConcert] = useState([])

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const [quantity, setQuantity] = useState(1); // Default value set to 1
  const [categoryname, setCategoryname] = useState('');


  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await axios.get("http://localhost:8080/api/concert")
        setConcert(res.data)
        console.log(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  const handleCloseModal = () => {  
    setShowLoginModal(false);
  };

const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false);
  };

  const handleErrorDialogClose = () => {
    setIsErrorDialogOpen(false);
  };

  const handleByTicket =async(e,item)=>{
    e.preventDefault()
    
    const userId = localStorage.getItem("userId")
    
    
    if(userId==null){
      setShowLoginModal(true)
    }else{
      try {
        const ticket = {
          
          concert : item.title,
          user: parseInt(userId), 
          quantity: quantity,
          categoryname:categoryname
    
        };
        console.log(ticket)
        const res = await axios.post("http://localhost:8080/api/ticket/create", ticket);
        console.log(res.data); 
        
        if (res.data === "Ticket create successfully.") {
          setIsSuccessDialogOpen(true);
        }

      } catch (error) {
        console.log(error);
        setIsErrorDialogOpen(true);
      }
    }
  }


  return (
    <>
    <div style={{ marginTop: '50px' }}>
      {concert.map((item) => (
        <div style={{ display: 'flex', justifyContent: 'center' }} key={item.id}>
          <Card sx={{  }}>
            <div style={{ display: 'flex' }}>
              <CardMedia
                sx={{}}
                height="500px"
                component="img"
                image={item.concertImg}  
              />
              <div style={{ flex: 1 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    藝人: {item.artist}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    時間: {item.date}
                  </Typography>
                </CardContent>
                <CardActions>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                      label="Quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      inputProps={{
                        min: 1,
                        max: 10,
                      }}
                      InputProps={{
                        inputProps: {
                          min: 1,
                          max: 10,
                        },
                        style: { width: '170px' }, 
                      }}
                      
                    />
                    <Select
                      label="Category"
                      value={categoryname}
                      onChange={(e) => setCategoryname(e.target.value)}
                    >
                      <MenuItem value="A區">A區</MenuItem>
                      <MenuItem value="B區">B區</MenuItem>
                      <MenuItem value="C區">C區</MenuItem>
                      <MenuItem value="D區">D區</MenuItem>
                    </Select>
                    <Button size="small" onClick={(e) => handleByTicket(e, item)} style={{ marginTop: '50px',border: '1px solid #ccc' }}>
                      BUY TICKET
                    </Button>
                  </div>

                </CardActions>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>

    <Modal
      open={showLoginModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <Box sx={{ textAlign: 'center', padding: '20px', background: '#fff' }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Typography id="modal-description" sx={{ marginTop: 2 }}>
            You need to log in to buy tickets.
          </Typography>
          <Button variant="contained" onClick={handleCloseModal} sx={{ marginTop: 2 }}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>

    <Dialog open={isSuccessDialogOpen} onClose={handleSuccessDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Ticket purchased successfully!</DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isErrorDialogOpen} onClose={handleErrorDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>There was an error processing your request.</DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  </>

  )
}

export default Home