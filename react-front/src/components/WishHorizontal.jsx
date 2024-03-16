import React from 'react'
import { Clear, Favorite, FavoriteBorder } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import QuantityInput from './NumberInput'
import { Link } from 'react-router-dom'

import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios'
import Swal from 'sweetalert2'

const ProductHorizontal = ({img, productName, id}) => {

  function Query600() {
    const matches = useMediaQuery('(max-width:600px)');
    return matches
  }

  const removeWish = async () => {
    console.log('remove')
    await axios.get('http://localhost:3001/header', { withCredentials: true })
    .then( async (res) => {
        
        if(res.data[0] === 'session'){

          await axios.get('http://localhost:3001/removeWish/'+res.data[1].id+"/"+id)
          .then(async (resWishes) => {
            console.log(resWishes.data)
            if(resWishes.data === 1){

              Swal.fire({
                title: "Product removed from your wishlist",
                confirmButtonText: "Got it",
                confirmButtonColor:"#90caf9",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload()
                }
              })
            } else {
              Swal.fire({
                title: "Something went wrong",
                confirmButtonText: "Got it",
                confirmButtonColor:"#90caf9",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload()
                }
              })
            }
            
          })
          .catch((err) => {
            console.log(err)
          })
        }
        
    })
  }

  const hoverEnter = (id) => {
    document.getElementsByClassName('favFilled'+id)[0].style.display = "none"
    document.getElementsByClassName('favBorder'+id)[0].style.display = "block"
  }

  const hoverLeave = (id) => {
    document.getElementsByClassName('favFilled'+id)[0].style.display = "block"
    document.getElementsByClassName('favBorder'+id)[0].style.display = "none"
  }

  return (<>
    <Link to={"/product/"+productName} className="toProduct" style={Query600() ? {display:"block", padding:"15px 0 0 0"} : {display:"none"}} ><Typography variant='p'>{productName}</Typography></Link>
    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-around", width:"100%", p:"10px"}}>

        <Box sx={Query600() ? {flexBasis:"20%", display:"flex", justifyContent:"flex-start", alignItems:"center"} : {flexBasis:"50%", display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
          <img src={img} style={{width:"50px", borderRadius:"5px", margin:"auto 15px"}} alt='ProductHorizontal'/>
          <Link to={"/product/"+productName} className="toProduct" style={Query600() ? {display:"none"} : {display:"block", marginRight:"5px"}} ><Typography variant='p'>{productName}</Typography></Link>
        </Box>

        <Box>
          <Button className='favProfile' onClick={removeWish} onMouseEnter={() => hoverEnter(id)} onMouseLeave={() => hoverLeave(id)}>
            <Favorite className={'favFilled'+id}/>
            <FavoriteBorder sx={{display:"none"}} className={'favBorder'+id}/>
          </Button>
        </Box>

    </Box>
    </>
  )
}

export default ProductHorizontal
