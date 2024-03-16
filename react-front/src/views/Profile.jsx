import React, { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import axios from "axios";
import BasicTabs from '../components/ProfileTab';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate()

  const auth = async () => {
    axios.get('http://localhost:3001/header', { withCredentials: true })
      .then((res) => {
        //console.log(res.data)
        if(res.data[0] !== "session"){
          navigate('/')
        }
      })
  }

  useEffect(() => {
    auth()
  }, [])


  return (
    <Container maxWidth="xl" sx={{display:"flex", alignItems:"center", justifyContent:"center", m:"20px auto"}}>

        <Grid container justifyContent="center" sx={{backgroundColor:"#202020", m:"0 auto", borderRadius:"10px"}}>

            <Grid item xs={12} md={8}>
                <BasicTabs/>
            </Grid>

        </Grid>
    </Container>
  )
}

export default Profile
