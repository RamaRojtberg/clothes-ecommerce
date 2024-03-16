import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import axios from "axios";
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import {LocalMall, Diamond, Search} from '@mui/icons-material';
import MainCarousel from '../components/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Swal from 'sweetalert2'
import TemporaryDrawer from '../components/Drawer';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { addFirstCategories, addSecondCategories, addThirdCategories } from '../store/slice';


import { useFormik } from 'formik';
import * as yup from 'yup';



const Header = () => {

  const [firstName, setFirstName] = useState('')

  const Query520 = () => {
    const matches = useMediaQuery('(max-width:520px)')
    return matches
  }
  
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const firstCategories = useSelector(state => state.firstCategories.firstCategories)
  const secondCategories = useSelector(state => state.secondCategories.secondCategories)
  const thirdCategories = useSelector(state => state.thirdCategories.thirdCategories)


  const auth = async () => {
    axios.get('http://localhost:3001/header', { withCredentials: true })
      .then((res) => {
        //console.log(res.data)
        if(res.data[0] === "session"){
          setFirstName(res.data[1].firstName)
        }
      })
  }

  const categories = async () => {
    if(firstCategories.length === 0){
      axios.get('http://localhost:3001/firstCategories')
      .then((firstCategories) => {
        //console.log('FIRST CATEGORIES', firstCategories.data)
        if(firstCategories.data.length > 0){

          dispatch(addFirstCategories(firstCategories.data))

          axios.get('http://localhost:3001/secondCategories')
          .then((secondCategories) => {
            //console.log('SECOND CATEGORIES', secondCategories.data)
            if(secondCategories.data.length > 0){

              let add2Categories = []
              for (let i = 0; i < firstCategories.data.length; i++) {
                let aux2Cat = []
                for (let k = 0; k < secondCategories.data.length; k++) {
                  if(secondCategories.data[k].first_category_id === firstCategories.data[i].id){
                    aux2Cat.push(secondCategories.data[k])
                  }
                }
                add2Categories.push(aux2Cat)
              }

              dispatch(addSecondCategories(add2Categories)) 

              axios.get('http://localhost:3001/thirdCategories')
              .then((thirdCategories) => {
                //console.log('THIRD CATEGORIES', thirdCategories.data)
                if(thirdCategories.data.length > 0){

                  let add3Categories = []
                  for (let i = 0; i < firstCategories.data.length; i++) {
                    let aux3Cat = []
                    
                    for (let k = 0; k < secondCategories.data.length; k++) {
                      let aux3Cat1 = []
                      for (let j = 0; j < thirdCategories.data.length; j++) {
                        if(thirdCategories.data[j].first_category_id === firstCategories.data[i].id        &&        thirdCategories.data[j].second_category_id === secondCategories.data[k].id){
                          aux3Cat1.push(thirdCategories.data[j])
                        }
                      }
                      if(aux3Cat1.length > 0){
                        aux3Cat.push(aux3Cat1)
                      }
                    }
                    
                    add3Categories.push(aux3Cat)
                  }

                  dispatch(addThirdCategories(add3Categories))

                }
              })
            }
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Categories cannot be displayed",
          confirmButtonText: "Got it",
          confirmButtonColor:"#90caf9",
        })
      })

      
    }
  }

  const logout = async () => {
    axios.get('http://localhost:3001/logout', { withCredentials: true })
    .then((res) => {

      if(res.data === "logout"){

        localStorage.clear()
        setFirstName('')

        let timerInterval;
        Swal.fire({
          title: "Loggin out",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          navigate('/')
        })

      } else {
        Swal.fire({
          title: "Something went wrong",
          confirmButtonText: "Got it",
          confirmButtonColor:"#90caf9",
        })
      }
      
    })
    

  }

  const logButtons = () => {

    let name = null

    if(firstName){
      name = firstName
    } else if(localStorage.getItem("firstName")){
      name = localStorage.getItem("firstName")
    } else {
      name = null
    }
    return name

  }

  useEffect(()=>{
    auth()
    categories()
    setSearchValue('')
  },[])

  const [cat1Index, setCat1Index] = useState(0)
  const [cat2ByCat, setCat2ByCat] = useState([])
  const [cat3ByCat, setCat3ByCat] = useState([])

  const [routeCat1, setRouteCat1] = useState('')
  const [routeCat2, setRouteCat2] = useState('')

  const [searchValue, setSearchValue] = useState('')


  const show2Cat = async (index) => {
    //console.log('1Cat index', index);
    //console.log(secondCategories[0][index].map((value) => value.name))
    setCat2ByCat(secondCategories[0][index].map((value) => [value.name, value.route]))
    setRouteCat1(firstCategories[0][index].route)
    setCat1Index(index)
  }

  const show3Cat = async (index1) => {
    //console.log('2Cat index', index1)
    //console.log(thirdCategories[0][cat1Index][index1].map((value) => value.name))
    setCat3ByCat(thirdCategories[0][cat1Index][index1].map((value) => [value.name, value.route]))
    setRouteCat2(secondCategories[0][cat1Index][index1].route)
  }

  const noShow2Cat = () => {
    setCat2ByCat([])
    setCat3ByCat([])
  }
  const noShow3Cat = () => {
    setCat3ByCat([])
  }


  const validationSchema = yup.object({
    search: yup
      .string()
      //.max(50, 'Email should be of maximum 50 characters length')
      .required('Search is empty'),
  })
  
  const formik = useFormik({
    initialValues: {
      search: searchValue,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //console.log(values.search)
      
      let search = values.search
      let noSpaces = search.replaceAll(" ", "-")
      let finalSearch = noSpaces.toLowerCase()
      //console.log('finalSearch', finalSearch)
      navigate('/search/'+finalSearch)
      window.location.reload()
    },
  })

  /*const toMain = () => {
    navigate('/')
    window.location.reload()
  }*/

  /*useEffect(() => {
    console.log('firstCategories', firstCategories[0])
    console.log('secondCategories', secondCategories[0])
    console.log('thirdCategories', thirdCategories[0])
  }, [firstCategories, secondCategories, thirdCategories])*/
  
  return (
    <div>
      <Box sx={{backgroundColor:"black", pt:"15px"}}>

        {
          Query520()
          ?
          <Box sx={{display:"flex", justifyContent:"space-evenly", alignItems:"center", pb:"15px"}}>
            <TemporaryDrawer onLogButtons={logButtons} onLogOut={logout} firstCategories={firstCategories[0]} secondCategories={secondCategories[0]} thirdCategories={thirdCategories[0]}/>
            <form onSubmit={formik.handleSubmit} sx={{width:"30%"}}>
              <Box sx={{display:"flex", alignItems:"center"}}>
                  <TextField label="Search" variant="standard" sx={{width:"100%", maxWidth:"380px"}}
                            id='search'
                            name='search'
                            value={formik.values.search}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                            {/* error={formik.touched.search && Boolean(formik.errors.search)} */}
                  <IconButton type="submit">
                    <Search sx={{fontSize:"30px"}}/>
                  </IconButton>
              </Box>
            </form>
          </Box>
          :
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Box sx={{display:"flex", justifyContent:"space-evenly", alignItems:"center", width:"100%"}}>

            <Link to='/'>
              <IconButton>
                <Diamond sx={{fontSize:"45px"}}/>
              </IconButton>
            </Link>

            <form onSubmit={formik.handleSubmit} sx={{width:"30%"}}>
              <Box sx={{display:"flex", alignItems:"center"}}>
                  <TextField label="Search" variant="standard" sx={{width:"100%", maxWidth:"380px"}}
                            id='search'
                            name='search'
                            value={formik.values.search}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                            {/* error={formik.touched.search && Boolean(formik.errors.search)} */}
                  <IconButton type="submit">
                    <Search sx={{fontSize:"30px"}}/>
                  </IconButton>
              </Box>
            </form>

            { logButtons() !== null
            ? <Box sx={{display:"flex", alignItems:"center"}}><Link className='toProduct' to='/profile'>{logButtons()}</Link> <Button onClick={logout} sx={{ml:"10px"}}>Log Out</Button></Box>
            : <Box sx={{display:"flex", alignItems:"center"}}>
                <LoginModal/>
                <RegisterModal/>
              </Box>
            }

            <Link to='/cart'>
              <IconButton>
                <LocalMall sx={{fontSize:"30px"}}/>
              </IconButton>
            </Link>

            </Box>
            {firstCategories.length > 0
            ? <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>

                <Box sx={{display:"flex", justifyContent:"space-evenly" ,color:"#ffffff", width: "100%", p:"10px 0px 10px 0px", mt:"10px", backgroundColor:"#202020", position:'relative'}}>

                  <Box sx={{display:"flex", justifyContent:"space-evenly" ,color:"#ffffff", width: "50%"}}>
                  {
                    firstCategories[0].map((value1Cat, index) => 
                      <Link key={index} to={"categories/"+value1Cat.route} className='toProduct'><Typography variant='p' sx={{fontSize:"20px", ":hover":{cursor:'pointer', color:"#90caf9"}}}  onMouseEnter={() => show2Cat(index)}>{value1Cat.name}</Typography></Link>
                    )
                  }
                  </Box>

                  <Box sx={{width:"100%", backgroundColor:"red", position:'absolute', top:50, zIndex:"1000"}} onMouseLeave={noShow2Cat}>
                  {
                    cat2ByCat.length > 0 &&
                    <Box sx={{display:'flex', justifyContent:"center", backgroundColor:"#292929", width:"100%", p:"10px 0", position:"relative"}} >
                      {cat2ByCat.map((value, index) =>
                        <Link key={index} to={"categories/"+routeCat1+"/"+value[1]} className='toProduct'><Typography variant='p' sx={{fontSize:"18px", mr:"30px", ":hover":{cursor:'pointer', color:"#90caf9"}}} onMouseEnter={() => show3Cat(index)}>{value[0]}</Typography></Link>)
                      }
                      {
                        cat3ByCat.length > 0 &&
                        <Box sx={{display:'flex', justifyContent:"center", backgroundColor:"#292929", width:"100%", p:"10px 0", position:'absolute', top:47, zIndex:"1001"}} onMouseLeave={noShow3Cat}>
                          {cat3ByCat.map((value, index) =>
                            <Link key={index} to={"categories/"+routeCat1+"/"+routeCat2+"/"+value[1]} className='toProduct'><Typography key={index} variant='p' sx={{fontSize:"16px", mr:"20px", ":hover":{cursor:'pointer', color:"#90caf9"}}}>{value[0]}</Typography></Link>)
                          }
                        </Box>
                      }
                    </Box>
                  }
                  </Box>

                </Box>

                
                
                                
              </Box>
            : <Box>No categories available</Box>
            }
          </Box>
          
        }

      </Box>
      <MainCarousel />
    </div>
  )
}

export default Header
