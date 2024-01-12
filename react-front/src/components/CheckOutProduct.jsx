import {Box, Grid, Typography } from '@mui/material'
import React from 'react'

const CheckOutProduct = ({name, quantity, price}) => {

  let qp = (quantity*price).toFixed(2)
  
  return (
    <Box sx={{width:"100%", display:"flex", alignItems:"center", m:"5px auto"}}>
        <Grid item xs={6}><Typography variant='p'>{name}</Typography></Grid>
        <Grid item xs={3} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='p'>{quantity}</Typography></Grid>
        <Grid item xs={3} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='p'>{qp}</Typography></Grid>
    </Box>
  )
}

export default CheckOutProduct
