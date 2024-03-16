import React, { useEffect, useState } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';

import { Box, Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import SecondCatBreadcrumb from '../components/SecondCatBreadcrumb';
import PaginationControlled from '../components/Pagination';

const productImages = require.context('../assets/products', true)
//const client = "http://localhost:3000/"
const server = "http://localhost:3001/"

const MainList = () => {

  const {firstRoute} = useParams()
  const {secondRoute} = useParams()

  const [products, setProducts] = useState([])
  const [firstCategory, setFirstCategory] = useState([])
  const [secondCategory, setSecondCategory] = useState([])
  const [page, setPage] = useState(0)
  const [pageUpdate, setPageUpdate] = useState(0)
  
  useEffect(()=>{
    /*console.log(firstRoute)
    console.log(secondRoute)*/
    firstCategories()
  },[firstRoute])

  /*useEffect(()=>{
    /*console.log(firstRoute)
    console.log(secondRoute)*/
    /*secondCategories()
  },[secondRoute])*/

  useEffect(()=>{
    //console.log('firstCategory', firstCategory)
    secondCategories()
    setPage(0)
  }, [firstCategory, secondRoute])

  useEffect(()=>{
    //console.log('secondCategory', secondCategory)
    getProducts()
  },[secondCategory])

  useEffect(()=> {
    /*console.log('products', products)
    console.log('products.length', products.length)*/
  },[products])



  const firstCategories = async () => {
    await axios.get(server+"firstCategories/")
    .then((res) => {
      //console.log('first cat', res.data)
      res.data.forEach((value) => {
        if(value.route === firstRoute){
          setFirstCategory([value.id, value.name, value.route])
        }
      })
    })
  }

  const secondCategories = async () => {
    await axios.get(server+"secondCategories/")
    .then((res) => {
      //console.log('second cat', res.data)
      res.data.forEach((value) => {
        if(value.route === secondRoute && value.first_category_id === firstCategory[0]){
          setSecondCategory([value.id, value.name, value.route])
        }
      })
    })
  }

  const getProducts = async () => {
    await axios.get(server)
    .then((res) => {
      //console.log(res.data)
      //setProducts(res.data)

      let thisCatProducts = []
      let prodPagination = []
      let counter = 0

      res.data.forEach((value) => {
        
        if(value.first_category_id === firstCategory[0] && value.second_category_id === secondCategory[0]){          
          //console.log('prodPagination', prodPagination)
          if(counter === 4){
            thisCatProducts.push(prodPagination)
            prodPagination = []
            //console.log(counter)
            //console.log(value)
            counter = 0
          } else {
            //console.log(value)
          }
          prodPagination.push(value)
          counter++
        }

      })
      thisCatProducts.push(prodPagination)
      setProducts(thisCatProducts)
    })
  }


  return (
    <Box>

      <Box sx={{width:"100%", display:"flex", justifyContent:"flex-start", alignItems:"center", p:"20px 0px 0px 30px"}}>
        <SecondCatBreadcrumb firstCat={firstCategory} secondCat={secondCategory}/>
      </Box>
  
      <Container maxWidth="xl" sx={{display:"flex", alignItems:"center", justifyContent:"center", m:"0px auto 20px"}}>

        <Box sx={{borderRadius:"5px", margin:"20px auto", width:"100%"}}>

          <Typography variant='h4' p={2} sx={{backgroundColor:"#202020", borderTopRightRadius:"5px", borderTopLeftRadius:"5px"}}>{secondCategory[1]}</Typography>

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
                <PaginationControlled pages={products.length} onSetPage={setPage} firstRoute={firstRoute} secondRoute={secondRoute}/>
              </Box>
              </>
              :
              <Grid item xs={12} sx={{fontSize:"32px"}}><Typography variant='h5'>There's no products in this category</Typography></Grid>
              }

              {/* <ProductCard id={id1} img={product1} name="Product" price={10} onAddToCart={addToCart} />*/}

          </Grid>

          

        </Box>

      </Container>

    </Box>
    
  )
}

export default MainList
