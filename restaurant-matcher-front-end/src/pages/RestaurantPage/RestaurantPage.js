import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import axios from "../../axios.config";
import {RestaurantPopUpAddingForm, RestaurantCard} from "./components";

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([])
  const [open, setOpen] = React.useState(false);

  const fetchData = () => {
    axios.get(`restaurant/`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          setRestaurants(res.data)
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
      {restaurants.map((restaurant, index) => {
        return (
          <RestaurantCard key={index} restaurant={restaurant} setRestaurants={setRestaurants}/>
          )
      })}
      <Button onClick={() => setOpen(true)}>
        Add new restaurant
      </Button>
      <RestaurantPopUpAddingForm open={open} setOpen={setOpen} setRestaurants={setRestaurants}/>

    </Grid>
  )

}
export default RestaurantPage;