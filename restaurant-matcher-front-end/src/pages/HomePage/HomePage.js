import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "../../axios.config";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = () => {

  const [persons, setPersons] = useState([])
  const [matchedRestaurant, setMatchedRestaurant] = useState(null)
  const [searching, setSearching] = useState(false)
  const {handleSubmit, register} = useForm({});

  const matchRestaurant = (data) => {
    setMatchedRestaurant(null)
    setSearching(true)

    // setMatchedRestaurant("Test")
    // axios.post(`restaurant/match`, data)
    //   .then(res => {
    //     if (res.status === 200) {
    //       console.log(res.data)
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.error(error.response.data); // => the response payload
    //     }
    //   });
  }

  const fetchPersons = () => {
    axios.get(`person/`)
      .then(res => {
        if (res.status === 200) {
          setPersons(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  const renderMatchedRestaurant = (restaurant) => {
    const {name, owner, cuisine, ratings} = restaurant
    const rating = ratings.length ?
      `${(ratings.reduce((p, c) => p + c, 0) / ratings.length).toFixed(2)} / 10`
      :
      "Not enough data"
    return (
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
          Cuisine Name: {cuisine.name}
        </Typography>
        <Typography>
          Rating: {rating}
        </Typography>
      </Grid>
    )
  }

  useEffect(() => {
    fetchPersons();
  }, []);


  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <form onSubmit={handleSubmit(matchRestaurant)}>
        <Grid
          item
          container
          direction="column"
          spacing={4}
          paddingTop={5}
        >
          <Grid item container direction={"row"} spacing={4}>
            <Grid item xs={6} sx={{minWidth: 275}}>
              <TextField
                select
                fullWidth
                label="Select"
                defaultValue=''
                inputProps={register('firstPerson', {
                  required: 'Please set first person',
                })}
              >
                {persons.map((person, index) => (
                  <MenuItem key={index} value={person}>
                    {person.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sx={{minWidth: 275}}>
              <TextField
                select
                fullWidth
                label="Select"
                defaultValue=''
                inputProps={register('secondPerson', {
                  required: 'Please set second person',
                })}
              >
                {persons.map((person, index) => (
                  <MenuItem key={index} value={person}>
                    {person.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item alignSelf={"center"}>
            <Button variant="contained" type="submit" color="primary">
              Match restaurant
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h1" component="div" gutterBottom>
        {searching ? <CircularProgress/> : matchedRestaurant && renderMatchedRestaurant(matchedRestaurant)}
      </Typography>
    </Grid>

  );
}
export default HomePage;