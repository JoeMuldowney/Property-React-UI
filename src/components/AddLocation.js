import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button, Snackbar } from '@mui/material';

export default function AddLocations() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId] = React.useState('')
    const[street,setStreet] = React.useState('')
    const[city,setCity] = React.useState('')
    const[zipCode,setZipCode] = React.useState('')
    const[state,setState] = React.useState('')
    const[price,setPrice] = React.useState('')
    const[snackbarOpen, setSnackbarOpen] = React.useState(false); 

    
    const handleClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const idValue = id; 
    const location = {street, city, zipCode, state, price}
    console.log(location)
    fetch("https://csportfoliojm.com/backend/location/"+ idValue,{
         method: "POST", 
         headers:{"Content-Type":"application/json"}, 
         body:JSON.stringify(location)
        })
        .then(() => {
          console.log("New location added");
          setSnackbarOpen(true); 
          // Clear input fields after successful insertion
          setId('');
          setStreet('');
          setCity('');
          setZipCode('');
          setState('');
          setPrice('');
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
}

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false); // Close Snackbar
    };

  return (
    
    <Container
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"black"}}><b>Enter client id with new location address</b></h1>
            <div className={Styles.spacing}>
      <TextField  label="Client Id " variant="outlined" fullWidth
      value={id}
      onChange={(e)=>setId(e.target.value)} /></div>

      <div>
      <TextField  label="Street" variant="outlined" fullWidth
      value={street}
      onChange={(e)=>setStreet(e.target.value)} /></div>
      <div className={Styles.spacing}>
      <TextField  label="City" variant="outlined" fullWidth
      value={city}
      onChange={(e)=>setCity(e.target.value)}/></div>
            <div>
      <TextField  label="ZIP Code" variant="outlined" fullWidth
      value={zipCode}
      onChange={(e)=>setZipCode(e.target.value)} /></div>
      <div className={Styles.spacing}>
      <TextField  label="State" variant="outlined" fullWidth
      value={state}
      onChange={(e)=>setState(e.target.value)}/></div>
      <div className={Styles.spacing}>
      <TextField  label="Price" variant="outlined" fullWidth
      value={price}
      onChange={(e)=>setPrice(e.target.value)}/></div>     
      
         
       <div className={Styles.buttonContainer}>
        <Button variant="contained" onClick={handleClick}>Submit</Button></div>   
      </Paper>

      {/* Snackbar to display success message */}
          <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000} // Adjust duration as needed
              onClose={handleCloseSnackbar}
              message="Location successfully inserted"
              action={
                <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
                Close
                </Button>
                }
                />
    </Container>
  );
};