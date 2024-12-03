import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import { Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TextField from '@mui/material/TextField';



export default function Report() {
    
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId] = React.useState('')
    const[firstName,setFirstName] = React.useState('')
    const[lastName,setLastName] = React.useState('')
    const[phoneNumber, setPhoneNumber] = React.useState('')
    const[email, setEmail] = React.useState('')
    const[street,setStreet] = React.useState('')
    const[city,setCity] = React.useState('')
    const[zipCode,setZipCode] = React.useState('')
    const[state,setState] = React.useState('')
    const[minPrice, setMinPrice] = React.useState('')
    const[maxPrice, setMaxPrice] = React.useState('')
    const [isReport, setIsReport] = React.useState(false);
    const [usePrice, setUsePrice] = React.useState(false);
    const [useState, setUseState] = React.useState(false);
    const [useCity, setUseCity] = React.useState(false);

    const [locationData, setLocationData] = React.useState({  
      locations: []
    });
    
  const lookupPriceRange=(e)=>{
    e.preventDefault();
    e.stopPropagation();       
   
    
   fetch(`https://csportfoliojm.com/backend/pricereport?lower=${minPrice}&upper=${maxPrice}`,{
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
      setLocationData(data); // Assuming you set the fetched data to locations
      setIsReport(true);
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

const lookupState=(e)=>{
  e.preventDefault();
  e.stopPropagation();       
 
  
 fetch(`https://csportfoliojm.com/backend/statereport?state=${state}`,{
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
    setLocationData(data); // Assuming you set the fetched data to locations
    setIsReport(true);
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
      {!isReport ? (
        <div>
          <h1 style={{ color: "black" }}><b>Report Generator</b></h1>
          <h3 style={{ color: "black" }}><b>Select Report Parameter</b></h3>
          <Button variant="contained" onClick={() => { setUsePrice(true); setUseState(false); }}>By Price Range</Button> <Button variant="contained" onClick={() => { setUsePrice(false); setUseState(true); }}>By State</Button>  
          
          

          {/* Conditional rendering based on selected report type */}
          {!usePrice && !useState ? (
              <div>
            </div>
          ) : usePrice && !useState ? (
            <div>
              <div className={Styles.spacing}>
                <TextField
                  label="Min Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  placeholder={"Set min price"}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className={Styles.spacing}>
                <TextField
                  label="Max Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  placeholder={"Set max price"}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className={Styles.buttonContainer}>
            <Button variant="contained" onClick={ lookupPriceRange}>
              Run
            </Button>
          </div>
            </div>
          ) : !usePrice && useState ? (
            <div>
              <div className={Styles.spacing}>
                <TextField
                  label="State Abbreviation"
                  variant="outlined"
                  fullWidth
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className={Styles.buttonContainer}>
            <Button variant="contained" onClick={ lookupState}>
              Run
            </Button>
          </div>
            </div>
            
          ) : null}


        </div>
      ) : (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>ZIP Code</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locationData.map((location, index) => (
              <TableRow key={index}>
                <TableCell>{location.street}</TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell>{location.state}</TableCell>
                <TableCell>{location.zipCode}</TableCell>
                <TableCell>{location.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </Paper>
</Container>
);
};