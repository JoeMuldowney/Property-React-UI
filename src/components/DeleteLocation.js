import * as React from 'react';
import Styles from './Styles.module.css';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';


export default function DeleteLocation(){
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId] = React.useState('')
    
    const handleClick=(e)=>{
        e.preventDefault();
        e.stopPropagation();   
        const idValue = id;  


    fetch("http://localhost:8080/location/" + idValue,{
         method: "DELETE", 
         
        })       

      .catch(error => {
          console.error("Error geting location:", error);
          
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
            <h1 style={{color:"blue"}}><b>Remove Location</b></h1>
            <TextField  label="Location id " variant="outlined" fullWidth
    value={id}
    onChange={(e)=>setId(e.target.value)} />

<div className={Styles.buttonContainer}><Button variant="contained" onClick={handleClick}>Delete</Button></div> 
      

     
      </Paper>
    </Container>

)}