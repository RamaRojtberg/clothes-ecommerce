import * as React from 'react';
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
import { useSelector } from 'react-redux';

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
  
  const products = useSelector(state => state.cart.products)

  const [open, setOpen] = React.useState(false);

  

  const handleOpen = () => {
    setOpen(true)
    console.log(products)
  }

  const totalProdAmount = () => {
    let totalAmount = 0

    products.map((value) =>
    totalAmount += (value.quantity * value.price))

    totalAmount = totalAmount.toFixed(2)
    //console.log(totalAmount);
    return totalAmount
  }

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant='outlined' sx={{m:"5px 0 15px 0", width:"40%"}}>Pay</Button>

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
              <CheckOutAmounts/>
            </Grid>

            <Divider/>

            <Typography variant='h5' sx={{textAlign:'right', m:"5px auto"}}>Total</Typography>

            <Button variant='outlined' sx={{float:"right", mt:"15px"}}>Pay</Button>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CheckOutModal