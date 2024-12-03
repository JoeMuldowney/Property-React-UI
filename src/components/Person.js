import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button, Snackbar } from '@mui/material';

export default function Person() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[firstName,setFirstName] = React.useState('')
    const[lastName,setLastName] = React.useState('')
    const [locations, setLocations] = React.useState([
      { street: '', city: '', zipCode: '', state: '', price: '' },
    ]);
    const[snackbarOpen, setSnackbarOpen] = React.useState(false);

    
    const handleClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();   
    const person = { firstName, lastName, locations }; 
    console.log(person)
    fetch("http://localhost:8060/backend/addperson",{
         method: "POST", 
         headers:{"Content-Type":"application/json"}, 
         body:JSON.stringify(person)
        })
        .then(() => {
          console.log("New location added");
          setSnackbarOpen(true); // Open Snackbar on successful insertion
          // Clear input fields after successful insertion
          setFirstName('');
          setLastName('');
          setLocations([
            { street: '', city: '', zipCode: '', state: '', price: '' },
          ]);
          
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
 const handleAddLocation = () => {
  setLocations((prevLocations) => [
    ...prevLocations,
    { street: '', city: '', zipCode: '', state: '', price: '' },
  ]);
  };

 const handleLocationChange = (index, field, value) => {
  setLocations((prevLocations) =>
    prevLocations.map((loc, i) =>
      i === index ? { ...loc, [field]: value } : loc
    )
  );
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
            <h1 style={{color:"black"}}><b>Add Client</b></h1>
            <div className={Styles.spacing}>
      <TextField  label="First Name" variant="outlined" fullWidth
      value={firstName}
      onChange={(e)=>setFirstName(e.target.value)} /></div>
      <div className={Styles.spacing}>
      <TextField  label="Last Name" variant="outlined" fullWidth
      value={lastName}
      onChange={(e)=>setLastName(e.target.value)}/></div>

      {locations.map((location, index) => (
          <div key={index}>
            <div className={Styles.spacing}>
            <TextField
              label={`Street ${index + 1}`}              
              fullWidth
              value={location.street}
              onChange={(e) =>
                handleLocationChange(index, 'street', e.target.value)
              }
              
            />
            </div>
            <div className={Styles.spacing}>
            <TextField
              label={`City ${index + 1}`}              
              fullWidth
              value={location.city}
              onChange={(e) =>
                handleLocationChange(index, 'city', e.target.value)
              }
            />
            </div>
            <div className={Styles.spacing}>
            <TextField
              label={`ZIP Code ${index + 1}`}              
              fullWidth
              value={location.zipCode}
              onChange={(e) =>
                handleLocationChange(index, 'zipCode', e.target.value)
              }
            />
            <div className={Styles.spacing}>
            <TextField
              label={`State ${index + 1}`}              
              fullWidth
              value={location.state}
              onChange={(e) =>
                handleLocationChange(index, 'state', e.target.value)
              }
            />
            </div>
            <div className={Styles.spacing}></div>
            <TextField
              label={`Price ${index + 1}`}              
              fullWidth
              value={location.price}
              onChange={(e) =>
                handleLocationChange(index, 'price', e.target.value)
              }
            />
            </div>
          </div>
        ))}
      
         
       <div className={Styles.buttonContainer}><Button onClick={handleAddLocation}>Add Another Location</Button>
        <Button variant="contained" onClick={handleClick}>Submit</Button></div> 
      </Paper>

            {/* Snackbar to display success message */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000} // Adjust duration as needed
              onClose={handleCloseSnackbar}
              message="Successfully inserted"
              action={
                <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
                Close
                </Button>
                }
                />
    </Container>
  );
};