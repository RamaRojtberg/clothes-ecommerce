import React, { useEffect } from 'react'
import { Clear } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import QuantityInput from './NumberInput'
import { Link } from 'react-router-dom'

import useMediaQuery from '@mui/material/useMediaQuery';

const PurchasesHorizontal = ({id, img, productName, color, size, quantity, currency, transactionAmount, date}) => {

  function Query670() {
    const matches = useMediaQuery('(max-width:670px)');
    return matches
  }

  return (<>
    <Box sx={Query670() ? {display:"flex", justifyContent:"space-evenly", pt:"20px", width:"100%"} : {display:"none"}} >
        <Link to={"/product/"+productName} className="toProduct"><Typography variant='p'>{productName}</Typography></Link>
        <Typography variant='p' >{date.slice(0, -19)}</Typography>
    </Box>
    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-around", width:"100%", p:"10px"}}>

        <Box sx={Query670() ? {display:"flex", justifyContent:"flex-start", alignItems:"center"} : {display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
          <img src={img} style={{width:"50px", borderRadius:"5px", margin:"auto 15px"}} alt='ProductHorizontal'/>
          <Link to={"/product/"+productName} className="toProduct" style={Query670() ? {display:"none"} : {display:"block", marginRight:"5px"}} ><Typography variant='p'>{productName}</Typography></Link>
          <Typography variant='p' sx={{mr:"5px"}}>{size}</Typography>
          <Typography variant='p' sx={{mr:"5px"}}>{color}</Typography>
          <Typography variant='p'>({quantity})</Typography>
        </Box>


        {
            !Query670() &&
            <>
            <Typography variant='p'>{date.slice(0, -19)}</Typography>
            <Typography variant='p'>Purchase ID: {id}</Typography>
            </>
        }
        
        
    </Box>

    {
        Query670()
        &&
        <Box sx={{width:"100%", pb:"20px"}}>
            <Typography variant='p'>Purchase ID: {id}</Typography>
        </Box>
        
    }
    </>
  )
}

export default PurchasesHorizontal
