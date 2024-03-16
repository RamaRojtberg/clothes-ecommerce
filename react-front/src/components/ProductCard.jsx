import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductCard = ({id, img, name, price}) => {
  
  const addToWishlist = () => {
    axios.get('http://localhost:3001/header', { withCredentials: true })
      .then((res) => {
        //console.log(res.data)
        if(res.data[0] === "session"){
          //console.log(res.data[1])
          let idUser = res.data[1].id
          axios.get('http://localhost:3001/addWish/'+idUser+'/'+id)
          .then((res) => {
            //console.log(res)
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

  const hoverEnter = (id) => {
    document.getElementsByClassName('favFilled'+id)[0].style.display = "block"
    document.getElementsByClassName('favBorder'+id)[0].style.display = "none"
  }

  const hoverLeave = (id) => {
    document.getElementsByClassName('favFilled'+id)[0].style.display = "none"
    document.getElementsByClassName('favBorder'+id)[0].style.display = "block"
  }

  return (
    <Grid item xs={10} sm={6} md={4} lg={3}>
        <Box className="product" sx={{display:"flex", flexDirection:"column", width:"80%", margin:"20px auto", backgroundColor:"#121212", borderBottomLeftRadius:"5px", borderBottomRightRadius:"5px"}}>
            <Link to={`/product/${name}`} className='toProduct'><img src={img} alt='prodImg' style={{maxWidth:"100%", borderTopRightRadius:"5px", borderTopLeftRadius:"5px"}}/></Link>
            <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center", p:"0px 5px 5px 5px"}}>
                {/* <Button onClick={addToWishlist}><FavoriteBorder/></Button> */}
                <Button className='favProfile' onClick={addToWishlist} onMouseEnter={() => hoverEnter(id)} onMouseLeave={() => hoverLeave(id)}>
                  <Favorite sx={{display:"none"}} className={'favFilled'+id}/>
                  <FavoriteBorder className={'favBorder'+id}/>
                </Button>
                <Typography variant='p' sx={{mr:"12px"}}>${price}</Typography>
            </Box>
            <Box sx={{width:"100%", display:"flex", justifyContent:"center", backgroundColor:"#070707", borderBottomLeftRadius:"5px", borderBottomRightRadius:"5px", p:"5px"}}>
              <Link to={`/product/${name}`} className="toProduct"><Typography variant='p'>{name}</Typography></Link>
            </Box>
        </Box>
    </Grid>
  )
}

export default ProductCard
