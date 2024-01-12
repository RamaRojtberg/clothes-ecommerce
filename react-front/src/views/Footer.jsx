import React from 'react'
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Facebook, Instagram, WhatsApp, YouTube } from '@mui/icons-material'

const Footer = () => {
  return (
    <>
        <Grid container sx={{backgroundColor:"black"}}>
            <Grid item xs={12} xl={6} sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                
                <List sx={{width:"50%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <Typography variant="h4">Categories</Typography>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Category 1" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Category 1" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Category 1" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Category 1" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} xl={6} sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Typography variant='h4'>Contact</Typography>
            </Grid> 
        </Grid>
        <Box sx={{backgroundColor:"black", width:"100%", display:"flex", justifyContent:"center"}}>
            <Box sx={{width:"20%", display:"flex", justifyContent:"space-around"}}>
                <Facebook sx={{fontSize:"32px"}}/>
                <Instagram sx={{fontSize:"32px"}}/>
                <YouTube sx={{fontSize:"32px"}}/>
                <WhatsApp sx={{fontSize:"32px"}}/>
            </Box>
        </Box>
    </>
  )
}

export default Footer
