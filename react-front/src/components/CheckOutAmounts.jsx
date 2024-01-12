import {Box, Grid, Typography } from '@mui/material'
import React from 'react'

const CheckOutAmounts = () => {
  return (<>
    <Box sx={{width:"100%", display:"flex", alignItems:"center", m:"5px auto"}}>
        <Grid item xs={6}><Typography variant='p'>Products</Typography></Grid>
        <Grid item xs={6} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='p'>Total</Typography></Grid>
    </Box>

    <Box sx={{width:"100%", display:"flex", alignItems:"center", m:"5px auto"}}>
        <Grid item xs={6}><Typography variant='p'>Shipping</Typography></Grid>
        <Grid item xs={6} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='p'>Total</Typography></Grid>
    </Box>

    <Box sx={{width:"100%", display:"flex", alignItems:"center", m:"5px auto"}}>
        <Grid item xs={6}><Typography variant='p'>Taxes</Typography></Grid>
        <Grid item xs={6} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='p'>Total</Typography></Grid>
    </Box>

    <Box sx={{width:"100%", display:"flex", alignItems:"center", m:"5px auto"}}>
        <Grid item xs={6}><Typography variant='p'>Total</Typography></Grid>
        <Grid item xs={6} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='p'>Total</Typography></Grid>
    </Box>
   </> 
  )
}

export default CheckOutAmounts
