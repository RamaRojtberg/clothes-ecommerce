import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const client = "http://localhost:3000/"

export default function FirstCatBreadcrumb({firstCat}) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
        <Typography>
          Categories
        </Typography>
        <Link
          color="text.primary"
          className='catBreadcrumb'
          to={client+"categories/"+firstCat[2]}
        >
          {firstCat[1]}
        </Link>
      </Breadcrumbs>
    </div>
  )
}