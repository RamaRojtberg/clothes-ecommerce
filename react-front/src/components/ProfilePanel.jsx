import React, { useEffect, useState } from 'react'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, useMediaQuery } from '@mui/material'
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';

const ProfilePanel = () => {

    const Query520 = () => {
        const matches = useMediaQuery('(max-width:520px)')
        return matches
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const [user, setUser] = useState([])

    const auth = async () => {
        axios.get('http://localhost:3001/header', { withCredentials: true })
          .then((res) => {
            //console.log(res.data)
            /*let userData = [res.data[1].firstName, res.data[1].lastName, res.data[1].email]
            setUser(userData)
            console.log(userData)*/
          })
      }

    const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .min(2, 'Name should be of minimum 2 characters length')
        .max(50, 'Name should be of maximum 50 characters length')
        .required('Name is required'),
    surname: yup
        .string('Enter your surname')
        .min(2, 'Surname should be of minimum 2 characters length')
        .max(50, 'Surname should be of maximum 50 characters length')
        .required('Surname is required'),
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
    confirmPassword: yup
        .string('Repeat your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(50, 'Password should be of maximum 50 characters length')
        .required('Password is required')
        .oneOf([yup.ref('password'), null], "Does not match with password")
    });

    const formik = useFormik({
    initialValues: {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        console.log(values);
    }
    });

    useEffect(()=> {
        auth()
    },[])


  return (
    <Grid container sx={{margin:"0 auto"}}>

        <form onSubmit={formik.handleSubmit} >

            <Grid container>

                <Grid item xs={12} md={4}>
                    <AccountCircle sx={{fontSize:"10rem", mt:"15px"}}/>
                </Grid>

                <Grid item xs={12} md={8}>
                
                    <TextField sx={Query520() ? {mt:"15px", width:"85%"} : {mt:"15px", width:"60%"}} label="First Name" variant="standard" placeholder={user[0]}/>
                    <TextField sx={Query520() ? {mt:"15px", width:"85%"} : {mt:"15px", width:"60%"}} label="Last Name" variant="standard" placeholder={user[1]}/>
                    <TextField sx={Query520() ? {mt:"15px", width:"85%"} : {mt:"15px", width:"60%"}} label="Email" variant="standard" placeholder={user[2]}/>

                    <FormControl sx={Query520() ? {mt:"15px", width:"85%"} : {mt:"15px", width:"60%"}} variant="standard">
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
                    
                    <FormControl sx={Query520() ? {mt:"15px", width:"85%"} : {mt:"15px", width:"60%"}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                        <Input
                            id="standard-adornment-password1"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name='confirmPassword'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Button type="submit" variant='outlined' sx={Query520() ? {mt:"15px", width:"85%"} : {mt:"15px", width:"60%"}}>
                        Submit changes
                    </Button>

                </Grid>
            
            </Grid>
        </form>

    </Grid>
  )
}

export default ProfilePanel
