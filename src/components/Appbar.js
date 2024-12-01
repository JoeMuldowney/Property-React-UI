import * as React from 'react';
import Person from './Person'
import PersonSearch from './PersonSearch'
import LocationSearch from './LocationSearch'
import Report from './Report'
import AddLocations from './AddLocation'
import DeleteLocation from './DeleteLocation'
import DeletePerson from './DeletePerson';
import UpdateClient from './UpdateClient';
import UpdateLocation from './UpdateLocation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'; 


export default function Appbar() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(null);
 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);  
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Add New Client'); }}>Add New Client</MenuItem>
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Lookup Client'); }}>Lookup Client</MenuItem>
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Update Client Info'); }}>Update Client </MenuItem>
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Lookup Location'); }}>Lookup Location</MenuItem>            
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Add Location'); }}>Add Location</MenuItem>
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Update Location Info'); }}>Update Location</MenuItem>
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Remove A Location'); }}>Remove Location</MenuItem>
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Remove A Client'); }}>Remove Client</MenuItem>
            <MenuItem onClick={() => { handleClose(); setSelectedOption('Run Report'); }}>Run Report</MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Menu
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1,textAlign: 'right', display: { xs: 'none', sm: 'block' } }}
          >
            Client Property System (CPS)
          </Typography>
          
        </Toolbar>
      </AppBar>
      {selectedOption === 'Add New Client' && <Person/>}
      {selectedOption === 'Lookup Client' && <PersonSearch />}
      {selectedOption === 'Update Client Info' && <UpdateClient />}
      {selectedOption === 'Lookup Location' && <LocationSearch />}
      {selectedOption === 'Add Location' && <AddLocations />}
      {selectedOption === 'Update Location Info' && <UpdateLocation />}
      {selectedOption === 'Remove A Location' && <DeleteLocation />}
      {selectedOption === 'Remove A Client' && <DeletePerson />}
      {selectedOption === 'Run Report' && <Report />}
    </Box>
    
  );
}