import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
import Button from "@mui/material/Button";

import axios from "../../../../axios.config";

const FriendshipCard = ({friendship, setFriendship}) => {

  const {members} = friendship


  const deleteFriendship = () => {
    axios.delete(`friendship/?person_name=${members[0]}&friend_name=${members[1]}`)
      .then(res => {
        if (res.status === 204) {
          setFriendship(friends => friends.filter(friendship =>
            !([...friendship.members].every(item => members.includes(item)) &&
              members.every(item => [...friendship.members].includes(item)))));
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }


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
              People in friendship: {members[0]} & {members[1]}
            </Typography>
          </Grid>

          <Grid item alignSelf={"center"}>
            <CardActions>
              <Button variant="contained" size="small" onClick={deleteFriendship} color="error">Delete</Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FriendshipCard;