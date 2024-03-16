import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

const client = "http://localhost:3000/"

export default function SecondCatBreadcrumb({firstCat, secondCat, thirdCat}) {
  return (
    <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
        <Typography>
          Categories
        </Typography>
        <Link
          color="inherit"
          to={client+"categories/"+firstCat[2]}
          className='catBreadcrumb'
        >
          {firstCat[1]}
        </Link>
        <Link
          color="text.primary"
          to={client+"categories/"+firstCat[2]+"/"+secondCat[2]}
          className='catBreadcrumb'
        >
          {secondCat[1]}
        </Link>
        <Link
          color="text.primary"
          to={client+"categories/"+firstCat[2]+"/"+secondCat[2]+"/"+thirdCat[2]}
          className='catBreadcrumb'
        >
          {thirdCat[1]}
        </Link>
      </Breadcrumbs>
    </div>
  )
}