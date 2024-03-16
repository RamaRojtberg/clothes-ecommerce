import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, TextField, Typography, useMediaQuery } from '@mui/material'
import axios from "axios";
import { AccountCircle } from '@mui/icons-material';
import ProductHorizontal from './ProductHorizontal';
import PurchasesHorizontal from './PurchasesHorizontal';

const PurchasesPanel = () => {

    const Query520 = () => {
        const matches = useMediaQuery('(max-width:520px)')
        return matches
    }

    const [user, setUser] = useState([])
    const [purchases, setPurchases] = useState([])

    const auth = async () => {
        axios.get('http://localhost:3001/header', { withCredentials: true })
          .then((res) => {
            console.log(res.data)
            /*let userData = [res.data[1].firstName, res.data[1].lastName, res.data[1].email]
            setUser(userData)*/
            //console.log(userData)
              axios.get('http://localhost:3001/userPurchases/'+res.data[1].id)
              .then((resPurchases) => {
                if(resPurchases.data[0] === "found"){
                  console.log(resPurchases.data[1])
                  setPurchases(resPurchases.data[1])
                }
              })
              .catch((err) => {
                console.log(err)
              })
          })
      }

    useEffect(()=> {
        auth()
    },[])

  const productImages = require.context('../assets/products', true)

  return (
    <Grid container sx={{margin:"0 auto"}}>

      {purchases.length === 0
      ? <Typography variant='h5' sx={{p:"20px", m:"0 auto"}}>You have not bought products yet</Typography>
      : purchases.map((value, index) =>
      <PurchasesHorizontal key={index} id={value.purchase_id} img={productImages(`./${value.img}`)} productName={value.productName} color={value.color} size={value.size} quantity={value.quantity} currency={value.currency} transactionAmount={value.transaction_amount} date={value.date_created}/>)
      }

    </Grid>
  )
}

export default PurchasesPanel
