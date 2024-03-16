import * as React from 'react';
//import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useEffect } from 'react';

export default function PaginationControlled({pages, onSetPage, firstRoute, secondRoute, thirdRoute}) {
  const [page, setPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value)
    onSetPage(value-1)
    //console.log('value', value)
  }
  /*useEffect(() => {
    console.log('page', page)
  }, [page])*/
  React.useEffect(()=>{
    //console.log('secondRoute', secondRoute)
    //console.log('page', page)
    setPage(1)
  }, [firstRoute, secondRoute, thirdRoute])

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination count={pages} page={page} onChange={handleChange} />
    </Stack>
  );
}