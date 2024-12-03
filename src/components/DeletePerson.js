import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button, Snackbar } from '@mui/material';


export default function DeletePerson(){
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId] = React.useState('')
    const[snackbarOpen, setSnackbarOpen] = React.useState(false);
    
    const handleClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();   
        const idValue = id;  


    fetch("https://csportfoliojm.com/backend/deleteperson/" + idValue,{
         method: "DELETE", 
         
        })
        .then(() => {
          console.log("Person removed");
          setSnackbarOpen(true); // Open Snackbar on successful insertion
          // Clear input fields after successful insertion
          setId('');          
      })         
      .catch(error => {
        console.error("Error looking up person:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with status:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something else happened while setting up the request
          console.error("Error setting up request:", error.message);
        }
          
        });

  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

 return (
    
    <Container component="form"
    sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    >
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"black"}}><b>Enter id of client to be removed</b></h1>
            <TextField  label="Client id " variant="outlined" fullWidth
    value={id}
    onChange={(e)=>setId(e.target.value)} />

<div className={Styles.buttonContainer}><Button variant="contained" onClick={handleClick}>Delete</Button></div> 

</Paper>

{/* Snackbar to display success message */}
<Snackbar
  open={snackbarOpen}
  autoHideDuration={6000} // Adjust duration as needed
  onClose={handleCloseSnackbar}
  message="Person successfully removed"
  action={
    <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
    Close
    </Button>
    }
    />
</Container>

)}