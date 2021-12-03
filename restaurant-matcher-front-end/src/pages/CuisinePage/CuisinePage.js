import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import axios from "../../axios.config";
import {CuisineCard, CuisinePopUpAddingForm} from "./components";

const CuisinePage = () => {
  const [cuisines, setCuisines] = useState([])
  const [open, setOpen] = React.useState(false);

  const fetchData = () => {
    axios.get(`cuisine/`)
      .then(res => {
        if (res.status === 200) {
          setCuisines(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {cuisines.map((cuisine, index) => {
        return (
          <CuisineCard key={index} cuisine={cuisine} setCuisines={setCuisines}/>
          )
      })}
      <Button onClick={() => setOpen(true)}>
        Add new cuisine
      </Button>
      <CuisinePopUpAddingForm open={open} setOpen={setOpen} setCuisines={setCuisines}/>

    </Grid>
  )

}
export default CuisinePage;