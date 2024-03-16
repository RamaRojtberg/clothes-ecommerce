import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Diamond, LocalMall, Login, Logout, Favorite, AccountCircle, PersonAdd, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoginModal from '../views/LoginModal';
import RegisterModal from '../views/RegisterModal';


export default function TemporaryDrawer({onLogButtons, onLogOut, firstCategories, secondCategories, thirdCategories}) {

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen)
  }

  /*React.useEffect(()=>{
    console.log('firstCategories', firstCategories)
    console.log('secondCategories', secondCategories)
    console.log('thirdCategories', thirdCategories)    
  },[firstCategories, secondCategories, thirdCategories])*/

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      <List>

        <ListItem>
          <Link to='/'>
            <IconButton onClick={toggleDrawer(false)}>
              <Diamond sx={{fontSize:"45px"}}/>
            </IconButton>
          </Link>
          {
            onLogButtons() !== null && <Typography variant='p'>{onLogButtons()}</Typography>
          }
          
        </ListItem>

      </List>

      <Divider />
      
      <List>

        {
          onLogButtons() === null
          &&<ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <Login />
                </ListItemIcon>
                <LoginModal/>
              </ListItemButton>
            </ListItem>
        }

        {
          onLogButtons() === null
          &&<ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <PersonAdd />
                </ListItemIcon>
                <RegisterModal/>
              </ListItemButton>
            </ListItem>
        }

        {
          onLogButtons() !== null
          &&<ListItem disablePadding onClick={toggleDrawer(false)}>
              <ListItemButton>
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                <Link className='toProduct' to='/profile'><Typography variant='p'>Profile</Typography></Link>
              </ListItemButton>
            </ListItem>
        }

        {
          onLogButtons() !== null
          &&<ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <Favorite />
                </ListItemIcon>
                <Typography variant='p'>Wishlist</Typography>
              </ListItemButton>
            </ListItem>
        }

        <ListItem disablePadding onClick={toggleDrawer(false)}>
          <ListItemButton>
            <ListItemIcon>
                <LocalMall />
            </ListItemIcon>
            <Link to="/cart" className='toProduct'><Typography variant='p'>Cart</Typography></Link>
          </ListItemButton>
        </ListItem>
        
        
        {
          onLogButtons() !== null
          && <ListItem disablePadding onClick={toggleDrawer(false)}>
              <ListItemButton>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <Typography variant='p' onClick={() => onLogOut()}>Log Out</Typography>
              </ListItemButton>
            </ListItem>
        }

      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography variant='h5'>Categories</Typography>
          </ListItemButton>
        </ListItem>

        {
          (firstCategories !== undefined && firstCategories.length > 0)  &&
          firstCategories.map((value, index) => 
          <Accordion key={index} sx={{backgroundColor:"#292929", boxShadow:'none', p:"0px !important"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Link to={"categories/"+value.route} className='toProduct'>{value.name}</Link>
            </AccordionSummary>
            <AccordionDetails sx={{p:"0px !important"}}>
              {
                (secondCategories !== undefined && secondCategories.length > 0) &&
                  secondCategories[index].map((value1,index1) =>
                  
                  <Accordion key={index1} sx={{backgroundColor:"#313131", boxShadow:'none', width:"100%", p:"0px !important"}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{maxHeight:"25px"}}
                    >
                      <Link to={"categories/"+value.route+"/"+value1.route} className='toProduct'>{value1.name}</Link>
                    </AccordionSummary>
                    <AccordionDetails >
                      {
                        (thirdCategories !== undefined && thirdCategories.length > 0) &&
                        thirdCategories[index][index1].map((value2, index2) => 
                        <Box key={index2}>
                          <Link to={"categories/"+value.route+"/"+value1.route+"/"+value2.route} className='toProduct'>{value2.name}</Link>
                        </Box>

                        )
                      }
                    </AccordionDetails>
                  </Accordion>)
              }
            </AccordionDetails>
          </Accordion>
          )
        }

      </List>

      
      
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}><Menu/></IconButton>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
