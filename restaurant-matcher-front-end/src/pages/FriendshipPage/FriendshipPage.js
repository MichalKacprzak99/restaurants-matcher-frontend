import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import axios from "../../axios.config";
import {FriendshipCard, FriendshipPopUpAddingForm} from "./components";

const FriendshipPage = () => {
  const [friendships, setFriendship] = useState([])
  const [open, setOpen] = React.useState(false);

  const fetchData = () => {
    axios.get(`friendship/`)
      .then(res => {
        if (res.status === 200) {
          setFriendship(res.data)
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
      justifyContent="space-evenly"
      alignItems="center"
      spacing={4}
      paddingTop={5}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {friendships.map((Friendship, index) => {
          return (
            <Grid item key={index}>
              <FriendshipCard friendship={Friendship} friendships={friendships} setFriendship={setFriendship}/>
            </Grid>
          )
        })}
      </Grid>

      <Grid item>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
          Add new friendship
        </Button>
      </Grid>

      <FriendshipPopUpAddingForm open={open} setOpen={setOpen} setFriendship={setFriendship}/>

    </Grid>
  )

}
export default FriendshipPage;