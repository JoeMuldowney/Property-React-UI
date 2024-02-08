import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';

export default function AddLocations() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId] = React.useState('')
    const[street,setStreet] = React.useState('')
    const[city,setCity] = React.useState('')
    const[zipCode,setZipCode] = React.useState('')
    const[state,setState] = React.useState('')
    const[price,setPrice] = React.useState('')

    
    const handleClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const idValue = id; 
    const location = {street, city, zipCode, state, price}
    console.log(location)
    fetch("http://18.116.200.65:8080/location/"+ idValue,{
         method: "POST", 
         headers:{"Content-Type":"application/json"}, 
         body:JSON.stringify(location)
        })
        .then(()=>console.log("New location added"))
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
            <h1 style={{color:"blue"}}><b>Enter Client ID And New Location Info</b></h1>
            <div className={Styles.spacing}>
      <TextField  label="client id " variant="outlined" fullWidth
      value={id}
      onChange={(e)=>setId(e.target.value)} /></div>

      <div>
      <TextField  label="street" variant="outlined" fullWidth
      value={street}
      onChange={(e)=>setStreet(e.target.value)} /></div>
      <div className={Styles.spacing}>
      <TextField  label="city" variant="outlined" fullWidth
      value={city}
      onChange={(e)=>setCity(e.target.value)}/></div>
            <div>
      <TextField  label="zipcode" variant="outlined" fullWidth
      value={zipCode}
      onChange={(e)=>setZipCode(e.target.value)} /></div>
      <div className={Styles.spacing}>
      <TextField  label="state" variant="outlined" fullWidth
      value={state}
      onChange={(e)=>setState(e.target.value)}/></div>
      <div className={Styles.spacing}>
      <TextField  label="price" variant="outlined" fullWidth
      value={price}
      onChange={(e)=>setPrice(e.target.value)}/></div>        

      
      
         
       <div className={Styles.buttonContainer}>
        <Button variant="contained" onClick={handleClick}>Submit</Button></div> 
      

     
      </Paper>
    </Container>
  );
};