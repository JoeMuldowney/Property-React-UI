import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import { Paper, Button } from '@mui/material';


export default function PersonSearch() {
    
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    
    const [personData, setPersonData] = React.useState(null);


    
    const lookupAllClick=(e)=>{
      e.preventDefault();
      e.stopPropagation();   
          
     
      
     fetch("http://localhost:8080/person",{
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
          setPersonData(data)
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
    


return(
    <Container component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
     <Paper elevation={3} style={paperStyle}>
          <h1 style={{color:"black"}}><b>Lookup All Clients</b></h1>
          
    {Array.isArray(personData) && personData.length > 0 && (
  <div>
    {personData.map((person, index) => (
      <div key={index}>
            <h2>Owner Information:</h2>
        <p>First Name: {person.firstName || 'N/A'}</p>
        <p>Last Name: {person.lastName || 'N/A'}</p>
        
        
        {Array.isArray(person.locations) && person.locations.length > 0 && (
          <div>
            <h3>Locations:</h3>
            <ul>
              {person.locations.map((location, locIndex) => (
                <li key={locIndex}>
                  <p>Id: {location.id}</p>
                  <p>Street: {location.street || 'N/A'}</p>
                  <p>City: {location.city || 'N/A'}</p>
                  <p>ZIP Code: {location.zipCode || 'N/A'}</p>
                  <p>State: {location.state || 'N/A'}</p>
                  <p>Price: {location.price || 'N/A'}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
)}
    
  
    
  
    <div className={Styles.buttonContainer}><Button variant="contained" onClick={lookupAllClick}>Search All</Button></div>

    

    
    </Paper>
    </Container>
    
 
  
  
);
}