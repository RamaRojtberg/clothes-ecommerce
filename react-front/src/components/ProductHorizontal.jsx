import React from 'react'
import { Clear } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import QuantityInput from './NumberInput'
import { Link } from 'react-router-dom'

import useMediaQuery from '@mui/material/useMediaQuery';

const ProductHorizontal = ({id, img, name, quantity, price, index, onModifyQuantity, onRemoveFromCart}) => {

  function Query600() {
    const matches = useMediaQuery('(max-width:600px)');
    return matches
  }

  const showChange = (event, newValue) => {
    if(!(newValue >= 1)){
      newValue = 1
    }
    console.log(`${event.type} event: the new value is ${newValue}`)
    onModifyQuantity(index, newValue)
  }

  return (<>
    <Link to="/product" className="toProduct" style={Query600() ? {display:"block", padding:"15px 0 0 0"} : {display:"none"}} ><Typography variant='p'>{name}</Typography></Link>
    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-around", width:"100%", p:"10px"}}>

        <Box sx={Query600() ? {flexBasis:"20%", display:"flex", justifyContent:"flex-start", alignItems:"center"} : {flexBasis:"50%", display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
          <img src={img} style={{width:"50px", borderRadius:"5px", margin:"auto 15px"}} alt='ProductHorizontal'/>
          <Link to="/product" className="toProduct" style={Query600() ? {display:"none"} : {display:"block"}} ><Typography variant='p'>{name}</Typography></Link>
        </Box>

        <Typography variant='p' sx={{flexBasis:"30%", display:"flex", justifyContent:"flex-end", mr:"10px"}}>Unit price: ${price}</Typography>
        
        <Box sx={{flexBasis:"20%", display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
          <QuantityInput value={quantity} onShowChange={showChange}/>

          <IconButton sx={{m:"0 5px 0 5px"}} onClick={() => onRemoveFromCart(id)}>
            <Clear/>
          </IconButton>
        </Box>
    </Box>
    </>
  )
}

export default ProductHorizontal
