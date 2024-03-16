import { Box, Button, Container, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductsSlider from '../components/ProductsSlider'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../store/slice'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import axios from 'axios'
import { FavoriteBorder, LocalMall } from '@mui/icons-material';


//import product1 from "../assets/products/product1.jpeg"
/*import product2 from "../assets/products/product2.jpeg"
import product3 from "../assets/products/product3.jpeg"
import product4 from "../assets/products/product4.jpeg"
import product5 from "../assets/products/product5.jpeg"
import product6 from "../assets/products/product6.jpeg"
import product7 from "../assets/products/product7.jpeg"
import product8 from "../assets/products/product8.jpeg"*/

/*const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
const id5 = 5;
const id6 = 6;
const id7 = 7;
const id8 = 8;*/


const productImages = require.context('../assets/products', true)
const route = "http://localhost:3001/product"

const Product = () => {

  const {name} = useParams()

  const Query520 = () => {
    const matches = useMediaQuery('(max-width:520px)')
    return matches
  }
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productsList = useSelector(state => state.cart.products)

  const [thisProd, setThisProd] = useState([])
  
  const [sizeIndex, setSizeIndex] = useState('');
  const [colorIndex, setColorIndex] = useState('');
  
  const [availableSizes, setAvailableSizes] = useState([])

  const [availableColors, setAvailableColors] = useState([])
  const [indivAvailableColors, setIndivAvailableColors] = useState([])
  
  const [relatedProds, setRelatedProds] = useState([])

  

  const handleChangeSize = (event) => {
    setSizeIndex(event.target.value)
    console.log(event.target.value)

    setIndivAvailableColors(availableColors[event.target.value])
    console.log('indivAvailableColors', availableColors[event.target.value]);
    console.log('availableSizes', availableSizes);
  }

  const handleChangeColor = (event) => {
    setColorIndex(event.target.value);
  }

  const relatedProducts = async () =>{
    await axios.get(route)
    .then((res)=> {
      //console.log(res.data)
      setRelatedProds(res.data)
    })
  }

  const thisProduct = async () => {
    await axios.get(route+"/"+name)
    .then((res) => {
      if(res.data !== "not-found"){
        setThisProd(res.data)
        console.log(thisProd.length);
        console.log(res.data);

        let sizes = JSON.parse(res.data.sizes)

        //ARRAYS DE OBJETOS (PRODUCTO 3) (ENTRIES)
        let sizesEntries = Object.values(sizes)
        //console.log(sizesEntries);

        let tempAvailableSizes = []
        let tempAvailableColors = []

        sizesEntries.forEach((value) => {

          let colorEntries = Object.entries(value.colors)
          tempAvailableSizes.push(value.size)
          tempAvailableColors.push(colorEntries)
          //console.log(value.size);

        })
        setAvailableSizes(tempAvailableSizes)
        setAvailableColors(tempAvailableColors)
        //console.log('availableColors', tempAvailableColors);
      }
      
    })
  }

  const addProductToCard = async() => {

    let sizeToBuy = availableSizes[sizeIndex]
    let colorToBuyObject = indivAvailableColors[colorIndex]

    if(sizeToBuy !== undefined && colorToBuyObject !== undefined){

      if(colorToBuyObject[1] > 0){

        /*console.log('sizeToBuy', sizeToBuy);
        console.log('colorToBuy', colorToBuyObject[0]);
        console.log('colorToBuyQuantity', colorToBuyObject[1]);*/

        await axios.get(route+"/"+name)
        .then((res) => {
          console.log('res', res.data);
          let sizes = JSON.parse(res.data.sizes)
          let colors = Object.entries(sizes[sizeIndex].colors)

          if(sizes[sizeIndex].size === sizeToBuy && colors[colorIndex][0] === colorToBuyObject[0]){
            //talle y color del estado y de la bd son iguales
            console.log(sizes[sizeIndex].size, "es igual a", sizeToBuy)
            console.log(colors[colorIndex][0], "es igual a", colorToBuyObject[0])

            if(colors[colorIndex][1] > 0 && colors[colorIndex][1] === colorToBuyObject[1]){
              //verifica que haya stock y la cantidad disponible en el estado sea la misma que en la bd
              /*console.log('hay stock en bd y es:', colors[colorIndex][1]);
              console.log('bd', res.data.id, res.data.name, res.data.price);
              console.log('state', thisProd.id, thisProd.name, thisProd.price);*/

              if(res.data.id === thisProd.id && res.data.name === thisProd.name && res.data.price === thisProd.price){

                const newToCart = {
                  id: res.data.id,
                  img: res.data.img,
                  name: res.data.name,
                  quantity:1,
                  color: colorToBuyObject[0],
                  size: sizeToBuy,
                  price: res.data.price,
                  weight: res.data.weight
                }

                //console.log('productsList', productsList)
                let exists = productsList.filter(value => value.id === res.data.id
                                                && value.size === sizeToBuy
                                                && value.color === colorToBuyObject[0])
                console.log('productsList', productsList);
                console.log('exists', exists)
                
                if(exists.length === 0 || exists[0].id !== res.data.id){
                  const add = dispatch(addProduct(newToCart))
                  if(add){
                    Swal.fire({
                      title: "Product added to the cart succesfully",
                      showCancelButton: true,
                      cancelButtonText: "Keep buying",
                      cancelButtonColor: "#90caf9",
                      confirmButtonText: "Go to cart",
                      confirmButtonColor:"#202020"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/cart")
                      }
                    })
                  }
                } else {
                  Swal.fire({
                    title: "There is already a product like this in the cart",
                    showCancelButton: true,
                    cancelButtonText: "Keep buying",
                    cancelButtonColor: "#90caf9",
                    confirmButtonText: "Go to cart",
                    confirmButtonColor:"#202020"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/cart")
                    }
                  })
                }

              } else {
                Swal.fire({
                  icon:"error",
                  title: "Something went wrong",
                  showCancelButton: true,
                  showConfirmButton: false,
                  cancelButtonText: "Got it",
                  cancelButtonColor: "#90caf9"
                })
              }

            } else {
              Swal.fire({
                title: "This product is currently out of stock",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: "Got it",
                cancelButtonColor: "#90caf9"
              })
            }
          } else {
            Swal.fire({
              title: "This product is currently out of stock",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: "Got it",
              cancelButtonColor: "#90caf9"
            })
          }

        })
        .catch((err) => {
          Swal.fire({
            icon:"error",
            title: "Something went wrong",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: "Got it",
            cancelButtonColor: "#90caf9"
          })
        })

      } else {
        Swal.fire({
          title: "This product is currently out of stock",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: "Got it",
          cancelButtonColor: "#90caf9"
        })
      }

    } else {
      Swal.fire({
        title: "Please select size and color",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Got it",
        cancelButtonColor: "#90caf9"
      })
    }

  }

  const buyProduct = async() => {

    let sizeToBuy = availableSizes[sizeIndex]
    let colorToBuyObject = indivAvailableColors[colorIndex]

    if(sizeToBuy !== undefined && colorToBuyObject !== undefined){

      if(colorToBuyObject[1] > 0){

        /*console.log('sizeToBuy', sizeToBuy);
        console.log('colorToBuy', colorToBuyObject[0]);
        console.log('colorToBuyQuantity', colorToBuyObject[1]);*/

        await axios.get(route+"/"+name)
        .then((res) => {
          console.log('res', res.data);
          let sizes = JSON.parse(res.data.sizes)
          let colors = Object.entries(sizes[sizeIndex].colors)

          if(sizes[sizeIndex].size === sizeToBuy && colors[colorIndex][0] === colorToBuyObject[0]){
            //talle y color del estado y de la bd son iguales
            console.log(sizes[sizeIndex].size, "es igual a", sizeToBuy)
            console.log(colors[colorIndex][0], "es igual a", colorToBuyObject[0])

            if(colors[colorIndex][1] > 0 && colors[colorIndex][1] === colorToBuyObject[1]){
              //verifica que haya stock y la cantidad disponible en el estado sea la misma que en la bd
              /*console.log('hay stock en bd y es:', colors[colorIndex][1]);
              console.log('bd', res.data.id, res.data.name, res.data.price);
              console.log('state', thisProd.id, thisProd.name, thisProd.price);*/

              if(res.data.id === thisProd.id && res.data.name === thisProd.name && res.data.price === thisProd.price){

                const newToCart = {
                  id: res.data.id,
                  img: res.data.img,
                  name: res.data.name,
                  quantity:1,
                  color: colorToBuyObject[0],
                  size: sizeToBuy,
                  price: res.data.price,
                  weight: res.data.weight
                }

                //console.log('productsList', productsList)
                let exists = productsList.filter(value => value.id === res.data.id
                                                && value.size === sizeToBuy
                                                && value.color === colorToBuyObject[0])
                console.log('productsList', productsList);
                console.log('exists', exists)
                
                if(exists.length === 0 || exists[0].id !== res.data.id){
                  const add = dispatch(addProduct(newToCart))
                  if(add){
                    let timerInterval
                    Swal.fire({
                      title: "Processing",
                      timer: 800,
                      timerProgressBar: true,
                      didOpen: () => {
                        Swal.showLoading()
                      },
                      willClose: () => {
                        clearInterval(timerInterval)
                      }
                    }).then((result) => {
                      navigate("/cart")
                    })                   
                  }
                } else {
                  Swal.fire({
                    title: "There is already a product like this in the cart",
                    showCancelButton: true,
                    cancelButtonText: "Keep buying",
                    cancelButtonColor: "#90caf9",
                    confirmButtonText: "Go to cart",
                    confirmButtonColor:"#202020"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/cart")
                    }
                  })
                }

              } else {
                Swal.fire({
                  icon:"error",
                  title: "Something went wrong",
                  showCancelButton: true,
                  showConfirmButton: false,
                  cancelButtonText: "Got it",
                  cancelButtonColor: "#90caf9"
                })
              }

            } else {
              Swal.fire({
                title: "This product is currently out of stock",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: "Got it",
                cancelButtonColor: "#90caf9"
              })
            }
          } else {
            Swal.fire({
              title: "This product is currently out of stock",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: "Got it",
              cancelButtonColor: "#90caf9"
            })
          }

        })
        .catch((err) => {
          Swal.fire({
            icon:"error",
            title: "Something went wrong",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: "Got it",
            cancelButtonColor: "#90caf9"
          })
        })

      } else {
        Swal.fire({
          title: "This product is currently out of stock",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: "Got it",
          cancelButtonColor: "#90caf9"
        })
      }

    } else {
      Swal.fire({
        title: "Please select size and color",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Got it",
        cancelButtonColor: "#90caf9"
      })
    }

  }

  const addToWishlist = (id) => {
    axios.get('http://localhost:3001/header', { withCredentials: true })
      .then((res) => {
        //console.log(res.data)
        if(res.data[0] === "session"){
          //console.log(res.data[1])
          let idUser = res.data[1].id
          axios.get('http://localhost:3001/addWish/'+idUser+'/'+id)
          .then((res) => {
            console.log(res)
            if(res.data){
              Swal.fire({
                title: "Product added to wishlist succesfully",
                confirmButtonText: "Got it",
                confirmButtonColor:"#90caf9",
              })
            } else {
              Swal.fire({
                title: "This product is already on the wishlist",
                confirmButtonText: "Got it",
                confirmButtonColor:"#90caf9",
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
        } else {
          Swal.fire({
            title: "Log In to add to wishlist",
            confirmButtonText: "Got it",
            confirmButtonColor:"#90caf9",
          })
        }
    })
  }

  useEffect(()=>{
    thisProduct()
    relatedProducts()
  },[name])

  return (
        <Container>
            <Box sx={{borderRadius:"5px", margin:"20px auto"}}>
                { thisProd.length !== 0 && <Typography variant='h4' p={2} sx={{backgroundColor:"#202020", borderTopRightRadius:"5px", borderTopLeftRadius:"5px"}}>{thisProd.name}</Typography> }
                <Grid container sx={{backgroundColor:"#252525", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px", width:"100%", m:"auto", p:"15px"}}>

                    { thisProd.length !== 0
                    ?<>
                      <Grid item xs={12} md={6} >
                        <Box className="firstBox" sx={{width:"100%", display:"flex", alignItems:"center"}}>
                            <img className='imgProd' src={thisProd.length === 0 ? "undefined" : productImages(`./${thisProd.img}`)} style={{borderRadius:"5px"}} alt='imgProd'/>
                            <ProductsSlider/>
                        </Box>                
                      </Grid>
                      <Grid item xs={12} md={6}>
                          <Box className='secondBox'>
                              <Typography variant='h4' mb={2}>Price: ${thisProd.price}</Typography>

                              <Typography variant='p' mb={2}>{thisProd.description}</Typography> 

                              <Box sx={{ minWidth: 120 }} mb={3}>
                                  <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                      <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={sizeIndex}
                                      label="Size"
                                      onChange={handleChangeSize}
                                      >
                                        {availableSizes.length > 0
                                        ? availableSizes.map((value, index) => <MenuItem key={index} value={index}>{value}</MenuItem>)
                                        :"No available sizes"}
                                      </Select>
                                  </FormControl>
                              </Box>

                              <Box sx={{ minWidth: 120 }} mb={2}>
                                  {indivAvailableColors.length > 0
                                  ?
                                  <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Color</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={colorIndex}
                                    label="Color"
                                    onChange={handleChangeColor}
                                    >
                                      {indivAvailableColors.map((value, index) => value[1] > 0 ? <MenuItem key={index} value={index}>{value[0]}</MenuItem> : <MenuItem key={index} value={index} disabled >{value[0]} no available</MenuItem>)}
                                    </Select>
                                  </FormControl>
                                  : <Typography variant='h5'>No colors available</Typography>}

                              </Box>
                          </Box>

                          <Box sx={{display:"flex", justifyContent:"space-around", width:"100%", p:"10px"}}>
                              <Button variant="outlined" onClick={() => buyProduct()}>Buy</Button>

                              <Button variant="outlined" className='displayTextProd' onClick={() => addToWishlist(thisProd.id)}>Add to Wishlist</Button>
                              <Button className='displayIconsProd' sx={{display:"none"}} variant='outlined' onClick={() => addToWishlist(thisProd.id)}><FavoriteBorder/></Button>

                              <Button variant="outlined" className='displayTextProd' onClick={() => addProductToCard()}>Add to Cart</Button>
                              <Button className='displayIconsProd' sx={{display:"none"}} variant='outlined' onClick={() => addProductToCard()}><LocalMall/></Button>
                          </Box>
                      </Grid>
                    </>
                    : <Grid item xs={12} sx={{fontSize:"32px"}}><Typography variant='h5'>Product not found</Typography></Grid>
                    }
                </Grid>

                <Divider textAlign="left" sx={{p:"5px"}}>Related Products</Divider>

                <Grid container justifyContent="center" sx={{backgroundColor:"#202020", m:"0 auto", p:"10px", borderRadius:"5px"}}>
                    {relatedProds.map((value, index) =><ProductCard key={index} id={value.id} img={productImages(`./${value.img}`)} name={value.name} price={value.price} onClick={() => thisProduct()}/>)}
                </Grid>

            </Box>
            
        </Container>
  )
}

export default Product
