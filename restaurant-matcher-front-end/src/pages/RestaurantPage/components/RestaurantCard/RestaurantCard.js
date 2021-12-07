import React, {useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "../../../../axios.config";
import {useForm} from "react-hook-form";
import {CardActions, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";


const RestaurantCard = ({restaurant, setRestaurants}) => {
  let {name, owner, cuisine, ratings, city, country} = restaurant
  const [restaurantRatings, addRating] = useState(ratings)
  const {handleSubmit, register} = useForm({});

  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += parseInt(ratings[i], 10); //don't forget to add the base
  }

  const [averageRating, setAverageRating] = useState(sum / ratings.length)


  const deleteRestaurant = () => {
    axios.delete(`restaurant/?restaurant_name=${name}`)
      .then(res => {
        if (res.status === 204) {
          setRestaurants(restaurant => restaurant.filter(person => person.name !== name));
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  const rateRestaurant = (rateData) => {
    axios.post(`restaurant/rate/?restaurant_name=${name}`, rateData)
      .then(res => {
        if (res.status === 200) {
          addRating(previousRatings => [...previousRatings, rateData['rating']])
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }
  useEffect(() => {

    let sum = 0;
    for (let i = 0; i < restaurantRatings.length; i++) {
      sum += parseInt(restaurantRatings[i], 10); //don't forget to add the base
    }
    setAverageRating(sum / restaurantRatings.length)

  }, [restaurantRatings])

  return (
    <Card sx={3}>
      <CardContent>
        <Grid
          container
          direction="column"
          spacing={3}
        >
          <Grid item>
            <Typography>
              Name: {name}
            </Typography>
            <Typography>
              Owner name: {owner.name}
            </Typography>
            <Typography>
              Owner phone: {owner.phone}
            </Typography>
            <Typography>
              Cuisine: {cuisine.name}
            </Typography>
            <Typography>
              City: {city}
            </Typography>
            <Typography>
              Country: {country}
            </Typography>
            <Typography>
              Rating: {restaurantRatings.length ? `${averageRating.toFixed(2)} / 10` : "Not enough data"}
            </Typography>
          </Grid>
          <Grid item container direction="column">

            <form onSubmit={handleSubmit(rateRestaurant)}>
              <Grid
                container
                direction="row"
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Grid item xs={8}>
                  <TextField
                    select
                    fullWidth
                    label="Select"
                    defaultValue=''
                    inputProps={register('rating', {
                      required: 'rating',
                    })}
                  >
                    {[...Array(11).keys()].map(rate => {
                      return (
                        <MenuItem key={rate} value={rate}>
                          {rate}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <CardActions>
                    <Button variant="contained" type={"submit"} size="small">Rate</Button>
                  </CardActions>
                </Grid>
              </Grid>
            </form>
            <Grid item alignSelf={"center"}>
              <CardActions>
                <Button variant="contained" size="small" onClick={deleteRestaurant} color="error">Delete</Button>
              </CardActions>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;