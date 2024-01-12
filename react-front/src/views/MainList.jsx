import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/slice';
import Swal from 'sweetalert2'

/*import product8 from "../assets/products/product8.jpeg"*/
import { Container } from '@mui/material';
import ProductCard from '../components/ProductCard';

import product1 from "../assets/products/product1.jpeg"
import product2 from "../assets/products/product2.jpeg"
import product3 from "../assets/products/product3.jpeg"
import product4 from "../assets/products/product4.jpeg"
import product5 from "../assets/products/product5.jpeg"
import product6 from "../assets/products/product6.jpeg"
import product7 from "../assets/products/product7.jpeg"
import { useNavigate } from 'react-router-dom';

const id1 = 1;
const id2 = 2;
const id3 = 3;
const id4 = 4;
const id5 = 5;
const id6 = 6;
const id7 = 7;
//const id8 = 8;

const MainList = () => {

  const navigate = useNavigate()
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
    
    if(exists.length === 0 || exists[0].id !== id){
      const add = dispatch(addProduct(newToCart))
      if(add){
        Swal.fire({
          title: "Product added to the cart succesfully",
          timer: 8000,
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
        timer: 8000,
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

  }

  return (
  
    <Container maxWidth="xl" sx={{display:"flex", alignItems:"center", justifyContent:"center", m:"20px auto"}}>

        <Grid container justifyContent="center" sx={{backgroundColor:"#202020", m:"0 auto", borderRadius:"10px"}}>

            <ProductCard id={id1} img={product1} name="Product" price={10} onAddToCart={addToCart} />
            <ProductCard id={id2} img={product2} name="Product" price={10} onAddToCart={addToCart} />
            <ProductCard id={id3} img={product3} name="Product" price={10} onAddToCart={addToCart} />
            <ProductCard id={id4} img={product4} name="Product" price={10} onAddToCart={addToCart} />
            
            <ProductCard id={id5} img={product5} name="Product" price={10} onAddToCart={addToCart} />
            <ProductCard id={id6} img={product6} name="Product" price={10} onAddToCart={addToCart} />
            <ProductCard id={id7} img={product7} name="Product" price={10} onAddToCart={addToCart} />

        </Grid>
    </Container>
  )
}

export default MainList
