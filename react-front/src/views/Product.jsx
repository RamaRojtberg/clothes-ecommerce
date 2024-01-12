import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import ProductsSlider from '../components/ProductsSlider'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../store/slice'
//import { useParams } from 'react-router-dom'

import product1 from "../assets/products/product1.jpeg"
import product2 from "../assets/products/product2.jpeg"
import product3 from "../assets/products/product3.jpeg"
import product4 from "../assets/products/product4.jpeg"
/*import product5 from "../assets/products/product5.jpeg"
import product6 from "../assets/products/product6.jpeg"
import product7 from "../assets/products/product7.jpeg"
import product8 from "../assets/products/product8.jpeg"*/

const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
/*const id5 = 5;
const id6 = 6;
const id7 = 7;
const id8 = 8;*/


const Product = () => {

  //const {name} = useParams()

  const [size, setsize] = React.useState('');


  const handleChangeSize = (event) => {
    setsize(event.target.value);
  };

  const [color, setcolor] = React.useState('');

  const handleChangeColor = (event) => {
    setcolor(event.target.value);
  };


  const dispatch = useDispatch()
  const productsList = useSelector(state => state.cart.products)

  const addToCart = (id, img, name, price) => {
    const newToCart = {
        id,
        img,
        name,
        quantity:1,
        price
    }

    let exists = productsList.filter(value => value.id === id)
    console.log(exists);

    if(exists.length === 0){
      const add = dispatch(addProduct(newToCart))
      if(add){
        console.log("Product added to the cart succesfully");
      }
    } else {
      if(exists[0].id === id){
        console.log('There is a product like this in the cart');
      } else {
        const add = dispatch(addProduct(newToCart))
        if(add){
          console.log("Product added to the cart succesfully");
        }
      }
    }

  }


  return (
        <Container>
            <Box sx={{borderRadius:"5px", margin:"20px auto"}}>
                <Typography variant='h3' p={2} sx={{backgroundColor:"#202020", borderTopRightRadius:"5px", borderTopLeftRadius:"5px"}}>Product name</Typography>
                <Grid container sx={{backgroundColor:"#252525", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px", width:"100%", m:"auto", p:"15px"}}>

                    <Grid item xs={12} md={6} >
                        <Box className="firstBox" sx={{width:"100%", display:"flex", alignItems:"center"}}>
                            <img className='imgProd' src={product1} style={{borderRadius:"5px"}} alt='imgProd'/>
                            <ProductsSlider/>
                        </Box>                
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className='secondBox'>
                            <Typography variant='h4' mb={2}>Price: $10</Typography>

                            <Typography variant='p' mb={2}>Lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit Lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit Lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit</Typography>

                            <Box sx={{ minWidth: 120 }} mb={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={size}
                                    label="Size"
                                    onChange={handleChangeSize}
                                    >
                                        <MenuItem value="S">S</MenuItem>
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="L">L</MenuItem>
                                        <MenuItem value="XL">XL</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ minWidth: 120 }} mb={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={color}
                                    label="Color"
                                    onChange={handleChangeColor}
                                    >
                                        <MenuItem value="Green">Green</MenuItem>
                                        <MenuItem value="Blue">Blue</MenuItem>
                                        <MenuItem value="Red">Red</MenuItem>
                                        <MenuItem value="Yellow">Yellow</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        <Box sx={{display:"flex", justifyContent:"space-around", width:"100%"}}>
                            <Button>Buy</Button>
                            <Button>Add to Favorites</Button>
                            <Button>Add to Cart</Button>
                            {/* onClick={() => onAddToCart(id, img, name, price)} */}
                        </Box>
                    </Grid>
                </Grid>

                <Divider textAlign="left" sx={{p:"5px"}}>Related Products</Divider>

                <Grid container justifyContent="center" sx={{backgroundColor:"#202020", m:"0 auto", p:"10px", borderRadius:"5px"}}>
                    <ProductCard id={id1} img={product1} name="Product" price={10} onAddToCart={addToCart} />
                    <ProductCard id={id2} img={product2} name="Product" price={10} onAddToCart={addToCart} />
                    <ProductCard id={id3} img={product3} name="Product" price={10} onAddToCart={addToCart} />
                    <ProductCard id={id4} img={product4} name="Product" price={10} onAddToCart={addToCart} />
                </Grid>

            </Box>
            
        </Container>
  )
}

export default Product
