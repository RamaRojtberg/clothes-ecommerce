import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import CheckOutProduct from '../components/CheckOutProduct';
import { Divider, Grid } from '@mui/material';
import CheckOutAmounts from '../components/CheckOutAmounts';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { addFees } from '../store/slice'


function Query600() {
    const matches = useMediaQuery('(max-width:600px)');
    return matches
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #252525',
  borderRadius:'5px',
  boxShadow: 24,
  p: 4,
};

const CheckOutModal = () => {
  
  const fees = useSelector(state => state.fees.fees)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const getFees = async () => {
    await axios.get('http://localhost:3001/commerce')
      .then((res) => {
        console.log(res.data)
        if(res.data[0] === "ok"){
          const aggFees = {
            shipping: res.data[1].shipping,
            tax: res.data[1].tax
          }
          dispatch(addFees(aggFees))
        } else {
            Swal.fire({
              title: "Something went wrong",
              confirmButtonText: "Got it",
              confirmButtonColor:"#90caf9",
            }).then((result) => {
              if (result.isConfirmed) {
                handleClose()
                window.location.reload()
              }
            })
        }
      })
  }
  
  const products = useSelector(state => state.cart.products)

  const [open, setOpen] = React.useState(false)

  const totalProdAmount = () => {
      let totalAmount = 0

      products.map((value) =>
      totalAmount += (value.quantity * value.price))

      totalAmount = totalAmount.toFixed(2)
      //console.log(totalAmount);
      return totalAmount
  }

  const shippingAmount = () => {

    console.log("shippingFee", fees[0].shipping)
    let totalShipping = 0

    products.map((value) =>
    totalShipping += (value.quantity * value.weight * fees[0].shipping))

    totalShipping = totalShipping.toFixed(2)
    return totalShipping

  }

  const taxesAmount = () => {

    console.log("taxFee", fees[0].tax)
    let totalTaxes = 0

    products.map((value) =>
    totalTaxes += (value.quantity * value.price * (fees[0].tax/100)))

    totalTaxes = totalTaxes.toFixed(2)
    return totalTaxes

  }

  const finalTotal = () => {
    let total = Number(totalProdAmount()) + Number(shippingAmount()) + Number(taxesAmount())
    total = total.toFixed(2)
    return total
  }

  const auth = async () => {

    axios.get('http://localhost:3001/header', { withCredentials: true })

      .then((res) => {
        //console.log(res.data)
        if(res.data[0] === "no-session"){
          Swal.fire({
            title: "Log In to buy a product",
            confirmButtonText: "Got it",
            confirmButtonColor:"#90caf9",
          }).then((result) => {
            if (result.isConfirmed) {
              handleClose()
            }
          })
        } else if (res.data[0] === "session"){
          axios.post("http://localhost:3001/purchaseValid", {
          body:{
            products,
            totalProdAmount: totalProdAmount(),
            shippingAmount: shippingAmount(),
            taxesAmount: taxesAmount(),
            finalTotal: finalTotal()
          }
          })
          .then((res)=>{
            //console.log(res.data)
            if(res.data === "valid"){
              //console.log('Compra válida')
              let timerInterval
              Swal.fire({
                title: "Processing",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                handleClose()
                navigate('/purchase')
              })
            } else {
              navigate('/')
            }
          })
          .catch((err)=>{
            Swal.fire({
              title: "Something went wrong",
              confirmButtonText: "Got it",
              confirmButtonColor:"#90caf9",
            }).then((result) => {
              if (result.isConfirmed) {
                handleClose()
                window.location.reload()
              }
            })
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Something went wrong",
          confirmButtonText: "Got it",
          confirmButtonColor:"#90caf9",
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose()
            window.location.reload()
          }
        })
      })
  }














  const handleOpen = () => {
    setOpen(true)
    getFees()
    //console.log(products)
  }

  const openExecution = () => {
    handleOpen()
  }

  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={openExecution} variant='outlined' sx={{m:"5px 0 15px 0", width:"40%"}}>Pay</Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} style={Query600() ? {width: "90%"} : {width: "550px"}}>

            <Typography id="transition-modal-title" variant="h5" sx={{mb:"15px", textAlign:"left"}}>
              You're buying these products
            </Typography>

            <Grid container>
              <Grid item xs={6}><Typography variant='h6'>Product</Typography></Grid>
              <Grid item xs={3} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='h6'>Quantity</Typography></Grid>
              <Grid item xs={3} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='h6'>Total</Typography></Grid>
            </Grid>

            <Grid container>
              {products.map((value, index) => 
                <CheckOutProduct key={index} name={value.name} quantity={value.quantity} price={value.price} />
              )}
            </Grid>

            <Typography variant='h5' sx={{textAlign:'right', m:"5px auto"}}>{totalProdAmount()}</Typography>

            <Divider/>

            <Typography id="transition-modal-title" variant="h5" sx={{m:"15px auto", textAlign:"left"}}>
              Total amount
            </Typography>

            <Grid container>
              <Grid item xs={6}><Typography variant='h6'>Reason</Typography></Grid>
              <Grid item xs={6} sx={{display:'flex', justifyContent:"flex-end"}}><Typography variant='h6'>Total</Typography></Grid>
            </Grid>

            <Grid container>
              <CheckOutAmounts onAmount={totalProdAmount} onShipping={shippingAmount} onTaxes={taxesAmount}/>
            </Grid>

            <Divider/>

            <Typography variant='h5' sx={{textAlign:'right', m:"5px auto"}}>{finalTotal()}</Typography>

            <Button variant='outlined' sx={{float:"right", mt:"15px"}} onClick={() => auth()}>Pay</Button>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CheckOutModal