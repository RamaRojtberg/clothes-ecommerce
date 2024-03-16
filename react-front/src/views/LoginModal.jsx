import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import Swal from 'sweetalert2'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { AlternateEmailOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

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

const LoginModal = () => {
  
  const [open, setOpen] = React.useState(false); 

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .max(50, 'Email should be of maximum 50 characters length')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .max(50, 'Password should be of maximum 50 characters length')
      .required('Password is required'),
  });
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //console.log(values);
      await axios.post("http://localhost:3001/login", {values}, { withCredentials: true })
      .then((res) => {

        //console.log('res.dataaaaaaaaaaaa', res.data);

        if(res.data[0] === "empty"){
          Swal.fire({
            title: "Please ingress both user and password",
            confirmButtonText: "Ok!",
            confirmButtonColor:"#90caf9"
          })
        } else if(res.data[0] === "not found"){
          Swal.fire({
            title: "There's no account linked to this email address",
            confirmButtonText: "Ok!",
            confirmButtonColor:"#90caf9"
          })
        } else if (res.data[0] === "no match") {
          Swal.fire({
            title: "Wrong email or password",
            confirmButtonText: "Ok!",
            confirmButtonColor:"#90caf9",
          })
        } else if(res.data[0] === "session") {

          let timerInterval;

          Swal.fire({
            title: "There's an active session",
            timer: 1000,
            timerProgressBar: false,
            confirmButtonText: "Ok!",
            confirmButtonColor:"#90caf9",
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            handleClose()
            window.location.reload()
          })

        } else if (res.data[0] === "match") {

          //console.log(res.data[1].firstName);
          localStorage.setItem("firstName", res.data[1].firstName)
          localStorage.setItem("lastName", res.data[1].lastName)

          let timerInterval;

          Swal.fire({
            title: "Loggin in",
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            handleClose()
            window.location.reload()
          })

          


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
      .catch((e) => {
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
    },
  });


  return (
    <div>
      <Typography onClick={handleOpen} variant='p' sx={{mr:"12px", ":hover":{cursor:"pointer", color:"gray"}}}>Log In</Typography>

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
              Log In
            </Typography>

            <form onSubmit={formik.handleSubmit}>
            <Grid container >

                <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                    <Box sx={{ display: 'flex', width:"100%", alignItems: 'flex-end', justifyContent:"center", m:"10px auto"}}>
                        <AlternateEmailOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField type="email" name='email' sx={{width:"60%"}} label="Email" variant="standard"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}/>
                    </Box>
                </Grid>

                <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                          <Box sx={{width:"100%", display:"flex", justifyContent:"center"}}>
                              <FormControl sx={{ m:"10px auto", width: '67%' }} variant="standard">
                                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                  <Input
                                      id="standard-adornment-password"
                                      type={showPassword ? 'text' : 'password'}
                                      name='password'
                                      value={formik.values.password}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      error={formik.touched.password && Boolean(formik.errors.password)}
                                      
                                      endAdornment={
                                      <InputAdornment position="end">
                                          <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                          >
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                      </InputAdornment>
                                      }
                                  />
                              </FormControl>
                          </Box>
                </Grid>
                

            </Grid>


            <Divider sx={{mt:"10px"}}/>


            <Button type="submit" variant='outlined' sx={{float:"right", mt:"15px"}}>Log In</Button>
            </form>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default LoginModal