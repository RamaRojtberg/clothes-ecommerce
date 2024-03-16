import React, { useEffect, useState } from 'react'
import {Grid, Typography, useMediaQuery } from '@mui/material'
import axios from "axios";
import WishHorizontal from './WishHorizontal';

const WishlistPanel = () => {

    const Query520 = () => {
        const matches = useMediaQuery('(max-width:520px)')
        return matches
    }

    const [user, setUser] = useState([])
    const [wishes, setWishes] = useState([])

    const auth = async () => {
        await axios.get('http://localhost:3001/header', { withCredentials: true })
          .then( async (res) => {
              
              if(res.data[0] === 'session'){

                await axios.get('http://localhost:3001/getWishes/'+res.data[1].id)
                .then(async (resWishes) => {
                  console.log(resWishes.data)
                  if(resWishes.data.length > 0){
                    setWishes(resWishes.data)
                  }
                  
                })
                .catch((err) => {
                  console.log(err)
                })
              }
              
          })
    }

    useEffect(()=> {
        auth()
    },[])

    useEffect(()=> {
      console.log(wishes)
    }, [wishes])



  const productImages = require.context('../assets/products', true)

  return (
    <Grid container sx={{margin:"0 auto"}}>

      { wishes !== undefined &&
        wishes.length === 0
      ? <Typography variant='h5' sx={{p:"20px", m:"0 auto"}}>No products in your wishlist</Typography>
      : wishes.map((value, index) =>
        <WishHorizontal key={index} img={productImages(`./${value.img}`)} productName={value.name} id={value.id}/>)
      }

    </Grid>
  )
}

export default WishlistPanel
