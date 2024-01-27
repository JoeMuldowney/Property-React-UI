import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';


export default function LocationSearch(){
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId] = React.useState('')
    const [locationData, setLocationData] = React.useState(null);

    const handleClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();   
        const idValue = id;  


    fetch("http://localhost:8080/location/" + idValue,{
         method: "GET", 
         headers:{"Content-Type":"application/json"}, 
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Location Data", data);
          setLocationData({
            street: data.street,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            price: data.price,
           
      })})
      .catch(error => {
          console.error("Error looking up person:", error);
          // Handle errors, e.g., show an error message to the user
        });

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
            <h1 style={{color:"blue"}}><b>Lookup a Location</b></h1>
            <TextField  label="Location id " variant="outlined" fullWidth
    value={id}
    onChange={(e)=>setId(e.target.value)} />
     {/* Display the personData */}
 {locationData && (
        <div>
          <h2>Location Information:</h2>
          <p>Street: {locationData.street}</p>
          <p>City: {locationData.city}</p>
          <p>State: {locationData.state}</p>
          <p>ZipCode: {locationData.zipCode}</p>
          <p>Price: {locationData.price}</p>
        </div>
      )}


<div className={Styles.buttonContainer}><Button variant="contained" onClick={handleClick}>Search</Button></div> 
      

     
      </Paper>
    </Container>

)}