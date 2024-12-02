import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';

export default function UpdateLocation() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId] = React.useState('')
    const[street,setStreet] = React.useState('')
    const[city,setCity] = React.useState('')
    const[zipCode,setZipCode] = React.useState('')
    const[state,setState] = React.useState('')
    const[price,setPrice] = React.useState()

    const [locationData, setLocationData] = React.useState(null);
    const [isSearched, setIsSearched] = React.useState(false);


    const handleSearchClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();   
        const idValue = id; 
    fetch("https://csportfoliojm.com/backend/location/" + idValue,{
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
          
        }
    )
    setStreet(data.street)
    setCity(data.city)
    setZipCode(data.state)
    setState(data.zipCode)
    setPrice(data.price)
    setIsSearched(true)})
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
    const handleClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const idValue = id; 
    const location = {street, city, zipCode, state, price}
    console.log(location)
    fetch("https://csportfoliojm.com/backend/location/" + idValue,{
         method: "PATCH", 
         headers:{"Content-Type":"application/json"}, 
         body:JSON.stringify(location)
        })
        .then(()=>console.log("location updated"))
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
            <h1 style={{color:"black"}}><b>Update Location</b></h1>
            {!isSearched ? (
          // Search Section
          <div>
            <div className={Styles.spacing}>
              <TextField
                label="Search by ID"
                variant="outlined"
                fullWidth
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className={Styles.buttonContainer}>
              <Button variant="contained" onClick={handleSearchClick}>
                Search
              </Button>
            </div>
          </div>
        ) : (
          // Update Form
          <div>
            <div className={Styles.spacing}>
              <TextField
                
                variant="outlined"
                fullWidth
                placeholder={locationData.street || "street"}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
              <TextField
                
                variant="outlined"
                fullWidth
                placeholder={locationData.city || "city"}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
              <TextField
                
                variant="outlined"
                fullWidth
                placeholder={locationData.state || "state"}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
              <TextField
                
                variant="outlined"
                fullWidth
                placeholder={locationData.zipCode || "zipCode"}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
              <TextField
                
                variant="outlined"
                fullWidth
                placeholder={locationData.price || "price"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className={Styles.buttonContainer}>
              <Button variant="contained" onClick={handleClick}>
                Update
              </Button>
              </div>
              <div className={Styles.buttonContainer}>
              <Button variant="contained" onClick={() => setIsSearched(false)} >
                New Search
              </Button>
            </div>
            </div>
          
        )}
      </Paper>
    </Container>
  );
}