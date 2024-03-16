import React, { useEffect, useState } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';

/*import product8 from "../assets/products/product8.jpeg"*/
import { Box, Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import PaginationControlled from '../components/Pagination';
import { useParams } from 'react-router-dom';

const productImages = require.context('../assets/products', true)
//const client = "http://localhost:3000/"
const server = "http://localhost:3001/"

const Search = () => {

  const {search} = useParams()

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  
  useEffect(()=>{
    setPage(0)
  },[])

  useEffect(() => {
    //console.log('search', search)
    getProducts()
  }, [search])

  useEffect(() => {
    console.log('products', products)
  }, [products])
  
  const getProducts = async () => {
    
    let searchArray = search.split("-")
    //console.log('searchArray', searchArray)

    let totalMatches = []

    for (let i = 0; i < searchArray.length; i++) {
        
        await axios.get(server+"search/"+searchArray[i])

        .then((res) => {
            //console.log(res.data)
            if(res.data.length > 0){
                res.data.forEach(value => {
                    //console.log(value)
                    totalMatches.push(value)
                })
            }

        })
        
    }

    //console.log('totalMatches', totalMatches)

    let totalMatchesIndex = []

    totalMatches.forEach((value) => {
        totalMatchesIndex.push(value.id)
    })

    //console.log('totalMatchesIndex', totalMatchesIndex)

    totalMatchesIndex.filter((item,index)=>{
        //console.log(item)
        //console.log(totalMatchesIndex.indexOf(item))
        if(totalMatchesIndex.indexOf(item) !== index){
            console.log('delete')
            totalMatches.splice(index, 1)
        }
    })


    console.log('totalMatches DEFINITIVO', totalMatches)

    /*totalMatches.filter((item,index)=>{
        console.log(item.id, index)
        console.log(totalMatches.indexOf(item) === index) 
    })*/

    let searchedProducts = []
    let prodPagination = []
    let counter = 0

    totalMatches.forEach((value => {
        //console.log('value', value)
        if(counter === 8){
        searchedProducts.push(prodPagination)
        prodPagination = []
        //console.log(counter)
        //console.log('value1', value1)
        counter = 0
        } else {
        //console.log('value1', value1)
        }
        prodPagination.push(value)
        counter++ 
    }))

    searchedProducts.push(prodPagination)
    setProducts(searchedProducts)
  }

  return (
  
    <Container maxWidth="xl" sx={{display:"flex", alignItems:"center", justifyContent:"center", m:"20px auto"}}>

      <Box sx={{borderRadius:"5px", margin:"20px auto", width:"100%"}}>

        <Typography variant='h4' p={2} sx={{backgroundColor:"#202020", borderTopRightRadius:"5px", borderTopLeftRadius:"5px"}}>Search</Typography>


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
            <Grid item xs={12} sx={{fontSize:"32px"}}><Typography variant='h5'>There's no products related to this search</Typography></Grid>
            }

          {/* <ProductCard id={id1} img={product1} name="Product" price={10} onAddToCart={addToCart} />*/}

        </Grid>

      </Box>
    </Container>
    
  )
}

export default Search
