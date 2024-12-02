import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import { Paper, Button } from '@mui/material';
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

    
    const lookupAllClick=(e)=>{
      e.preventDefault();
      e.stopPropagation();   
          
     


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
            <h1 style={{color:"black"}}><b>Report Generator</b></h1>
            <h3 style={{color:"black"}}><b>Select Parameters</b></h3>
           
         
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

          </div>
          <div className={Styles.spacing}>
              <TextField                
                label="Last Name"
                variant="outlined"
                type="string"
                fullWidth
                placeholder={"set last name"}

                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
      
          
          <div>
            

            <div className={Styles.spacing}>
              <TextField
                label="City"
                variant="outlined"
                type="string"
                fullWidth
                placeholder={"set city"}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
              <TextField                
                label="State"
                variant="outlined"
                type="string"
                fullWidth
                placeholder={"set state"}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className={Styles.spacing}>
          <TextField
            label="Min Price"
            type="number"
            variant="outlined"
            fullWidth
            placeholder={"set min price"}
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
            placeholder={"set max price"}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

              <div className={Styles.buttonContainer}>
              <Button variant="contained" >
                Run
              </Button>
            </div>
            </div>
          
      
      </Paper>

</Container>
    

);
}