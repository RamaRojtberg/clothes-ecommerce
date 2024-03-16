import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import ProductHorizontal from '../components/ProductHorizontal'

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

  const removeFromCart = (id, size, color) => {
    dispatch(removeProduct({id, size, color}))
  }

  const productImages = require.context('../assets/products', true)

  return (
    <Container>
        <Box sx={{borderRadius:"5px", margin:"20px auto"}}>
            <Typography variant='h3' p={2} sx={{backgroundColor:"#202020", borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>Cart</Typography>
            <Grid item xs={12} sx={{backgroundColor:"#252525", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"}}>
              
              {products.length === 0
              ? <Typography variant='h3' sx={{p:"20px"}}>There's no products in cart</Typography>
              : products.map((value, index) =>
              <ProductHorizontal key={index} id={value.id} img={productImages(`./${value.img}`)} name={value.name} quantity={value.quantity} price={value.price} size={value.size} color={value.color} index={index} onModifyQuantity={modifyQuantity} onRemoveFromCart={removeFromCart} />)
              }

              {products.length !== 0 && <CheckOutModal/>}
              
            </Grid>
        </Box>
    </Container>
  )
}

export default Cart
