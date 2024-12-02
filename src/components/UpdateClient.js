import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';

export default function UpdateClient() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[firstName,setFirstName] = React.useState('')
    const[lastName,setLastName] = React.useState('')
    const[phoneNumber, setPhoneNumber] = React.useState('')
    const[email, setEmail] = React.useState('')

    const[id,setId] = React.useState('')
    const [personData, setPersonData] = React.useState(null);
    const [isSearched, setIsSearched] = React.useState(false);

    
    const handleClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();   
    const person = { firstName, lastName, phoneNumber, email }; 
    console.log(person)
    const idValue = id;  
    fetch("https://csportfoliojm.com/backend/person/" + idValue,{
         method: "PATCH", 
         headers:{"Content-Type":"application/json"}, 
         body:JSON.stringify(person)
        })
        .then(()=>console.log("New person added"))
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
  
  const lookupClick=(e)=>{
      e.preventDefault();
      e.stopPropagation();   
      const idValue = id;     
     
      
     fetch("https://csportfoliojm.com/backend/person/"  + idValue,{
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
            phoneNumber: data.phoneNumber,
            email: data.email
            
      }
    )
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
            <h1 style={{color:"black"}}><b>Update Client</b></h1>
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
              <Button variant="contained" onClick={lookupClick}>
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
                placeholder={personData.firstName || "first name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
              <TextField
                
                variant="outlined"
                fullWidth
                placeholder={personData.lastName || "last name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
              <TextField
                
                variant="outlined"
                fullWidth
                placeholder={personData.phoneNumber || "phone number"}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
              <TextField
                
                variant="outlined"
                fullWidth
                placeholder={personData.email || "email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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