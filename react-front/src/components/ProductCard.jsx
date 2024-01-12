import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material';
import {AddShoppingCart, FavoriteBorder} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ProductCard = ({id, img, name, price, onAddToCart}) => {

  return (
    <Grid item xs={8} sm={6} md={4} lg={3}>
        <Box className="product" sx={{display:"flex", flexDirection:"column", width:"270px", margin:"20px auto", backgroundColor:"#121212", borderBottomLeftRadius:"5px", borderBottomRightRadius:"5px"}}>
            <Link to={`/product/${name}`} className='toProduct'><img src={img} alt='prodImg' style={{maxWidth:"100%", borderTopRightRadius:"5px", borderTopLeftRadius:"5px"}}/></Link>
            <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center", p:"0px 5px 5px 5px"}}>
                <Button><FavoriteBorder/></Button>
                <Typography variant='p'>${price}</Typography>
                <Button onClick={() => onAddToCart(id, img, name, price)}><AddShoppingCart/></Button>
            </Box>
            <Box sx={{width:"100%", display:"flex", justifyContent:"center", backgroundColor:"#070707", borderBottomLeftRadius:"5px", borderBottomRightRadius:"5px", p:"5px"}}>
              <Link to={`/product/${name}`} className="toProduct"><Typography variant='p'>Product name</Typography></Link>
            </Box>
        </Box>
    </Grid>
  )
}

export default ProductCard
