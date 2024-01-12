import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import ProductHorizontal from '../components/ProductHorizontal'

import product1 from "../assets/products/product1.jpeg"
import CheckOutModal from './CheckOutModal'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct, updateQuantity } from '../store/slice'
/*import product2 from "../assets/products/product2.jpeg"
import product3 from "../assets/products/product3.jpeg"
import product4 from "../assets/products/product4.jpeg"
import product5 from "../assets/products/product5.jpeg"
import product6 from "../assets/products/product6.jpeg"
import product7 from "../assets/products/product7.jpeg"
import product8 from "../assets/products/product8.jpeg"*/

const Cart = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.cart.products)

  const modifyQuantity = (index, newQuantity) => {
    dispatch(updateQuantity({
        index,
        newQuantity
    }))
  }

  const removeFromCart = (id) => {
    dispatch(removeProduct(id))
  }

  return (
    <Container>
        <Box sx={{borderRadius:"5px", margin:"20px auto"}}>
            <Typography variant='h3' p={2} sx={{backgroundColor:"#202020", borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>Cart</Typography>
            <Grid item xs={12} sx={{backgroundColor:"#252525", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"}}>
              <ProductHorizontal img={product1}/>
              {products.map((value, index) =>
                <ProductHorizontal key={index} id={value.id} img={value.img} name={value.name} quantity={value.quantity} price={value.price} index={index} onModifyQuantity={modifyQuantity} onRemoveFromCart={removeFromCart} />)}
              <CheckOutModal/>
            </Grid>
        </Box>
    </Container>
  )
}

export default Cart
