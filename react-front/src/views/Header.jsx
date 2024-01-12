import React from 'react'
import { Box, IconButton, TextField } from '@mui/material';
import {LocalMall, Diamond, Search} from '@mui/icons-material';
import MainCarousel from '../components/Carousel';
import { Link } from 'react-router-dom';

const Header = () => {
  
  return (
    <div>
      <Box
        sx={{
            backgroundColor:"black",
            display:"flex",
            justifyContent:"space-around",
            alignItems:"center",
            padding:"15px"
        }}
      >
        <Link to='/'>
          <IconButton>
            <Diamond sx={{fontSize:"45px"}}/>
          </IconButton>
        </Link>
        
        <Box sx={{display:"flex", alignItems:"center"}}>
            <TextField id="standard-basic" label="Search" variant="standard" />
            <IconButton>
              <Search sx={{fontSize:"30px"}}/>
            </IconButton>
        </Box>
        
        <Link to='/cart'>
          <IconButton>
            <LocalMall sx={{fontSize:"30px"}}/>
          </IconButton>
        </Link>
      </Box>
      <MainCarousel />
    </div>
  )
}

export default Header
