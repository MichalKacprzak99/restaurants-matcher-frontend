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
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={4}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {cuisines.map((cuisine, index) => {
          return (
            <Grid key={index}>
              <CuisineCard cuisine={cuisine} setCuisines={setCuisines}/>
            </Grid>
          )
        })}
      </Grid>
      <Grid item >
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
          Add new cuisine
        </Button>
      </Grid>

      <CuisinePopUpAddingForm open={open} setOpen={setOpen} setCuisines={setCuisines}/>

    </Grid>
  )

}
export default CuisinePage;