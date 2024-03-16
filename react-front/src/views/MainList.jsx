import React, { useEffect, useState } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';

/*import product8 from "../assets/products/product8.jpeg"*/
import { Box, Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import PaginationControlled from '../components/Pagination';

/*import product1 from "../assets/products/product1.jpeg"
import product2 from "../assets/products/product2.jpeg"
import product3 from "../assets/products/product3.jpeg"
import product4 from "../assets/products/product4.jpeg"
import product5 from "../assets/products/product5.jpeg"
import product6 from "../assets/products/product6.jpeg"
import product7 from "../assets/products/product7.jpeg"*/

/*const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
const id5 = 5;
const id6 = 6;
const id7 = 7;*/
//const id8 = 8;

const productImages = require.context('../assets/products', true)
//const client = "http://localhost:3000/"
const server = "http://localhost:3001/"

const MainList = () => {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  
  useEffect(()=>{
    getProducts()
    setPage(0)
  },[]) 
  
  const getProducts = async () => {
    await axios.get(server)
    .then((res) => {
    //console.log(res.data)
      let mainListProds = []
      let prodPagination = []
      let counter = 0

      res.data.forEach((value) => {
        if(counter === 8){
          mainListProds.push(prodPagination)
          prodPagination = []
          //console.log(counter)
          //console.log(value)
          counter = 0
        } else {
          //console.log(value)
        }
        prodPagination.push(value)
        counter++
      })

      mainListProds.push(prodPagination)
      setProducts(mainListProds)
    })
  }

  return (
  
    <Container maxWidth="xl" sx={{display:"flex", alignItems:"center", justifyContent:"center", m:"20px auto"}}>

      <Box sx={{borderRadius:"5px", margin:"20px auto", width:"100%"}}>

        <Typography variant='h4' p={2} sx={{backgroundColor:"#202020", borderTopRightRadius:"5px", borderTopLeftRadius:"5px"}}>Main Products</Typography>


        <Grid container sx={{backgroundColor:"#252525", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px", width:"100%", m:"auto", p:"15px"}} className='containerProds'>

          {
            products[0] !== undefined &&
            products[0].length > 1
            ?
            <>
            {products[page].map((value, index)=>
              //value.map((value1, index1) => {
                //console.log(value.name)
                <ProductCard key={index} id={value.id} img={productImages(`./${value.img}`)} name={value.name} price={value.price} />
              //})
            )}
            <Box sx={{width:"100%", display:"flex", justifyContent:"center", p:"15px"}}>
              <PaginationControlled pages={products.length} onSetPage={setPage}/>
            </Box>
            </>
            :
            <Grid item xs={12} sx={{fontSize:"32px"}}><Typography variant='h5'>There's no products in this category</Typography></Grid>
          }

          {/* <ProductCard id={id1} img={product1} name="Product" price={10} onAddToCart={addToCart} />*/}

        </Grid>

      </Box>
    </Container>
    
  )
}

export default MainList
