import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';

export default function PersonSearch() {
    
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId] = React.useState('')
    const [personData, setPersonData] = React.useState(null);


    const lookupClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();   
        const idValue = id;     
       
        
       fetch("https://csportfoliojm.com/backend/findperson/"  + idValue,{
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
            console.log("Person Data", data);
            setPersonData({
              firstName: data.firstName,
              lastName: data.lastName,
              locations: data.locations || []  // Ensure locations is always an array
        })})
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


return(
    <Container component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
     <Paper elevation={3} style={paperStyle}>
          <h1 style={{color:"black"}}><b>Search by client id</b></h1>
          <TextField  label="Person id " variant="outlined" fullWidth
    value={id}
    onChange={(e)=>setId(e.target.value)} />
 {/* Display the personData */}
 {personData && (
        <div>
          <h2>Owner Information:</h2>
          <p>First Name: {personData.firstName}</p>
          <p>Last Name: {personData.lastName}</p>

          {/* Display locations if available */}
          {personData.locations && personData.locations.length > 0 && (
            <div>
              <h3>Locations:</h3>
              <ul>
                {personData.locations.map((location, index) => (
                  <li key={index}>
                    <p>Street: {location.street}</p>
                    <p>City: {location.city}</p>
                    <p>ZIP Code: {location.zipCode}</p>
                    <p>State: {location.state}</p>
                    <p>Price: {location.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    
  
    
    <div className={Styles.buttonContainer}><Button variant="contained" onClick={lookupClick}>Search</Button></div>
    

    

    
    </Paper>
    </Container>
    
 
  
  
);
}