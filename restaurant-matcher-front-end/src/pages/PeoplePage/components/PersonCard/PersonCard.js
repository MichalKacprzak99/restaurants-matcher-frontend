import React from 'react';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import axios from "../../../../axios.config";


const PersonCard = ({person, setPersons}) => {

  const {name, phone, city} = person

  const deletePerson = () => {
    axios.delete(`person/?person_name=${name}`)
      .then(res => {
        if (res.status === 204) {
          setPersons(persons => persons.filter(person => person.name !== name));
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  return (
    < Card sx={{minWidth: 275}}>
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent={"space-between"}
        >
          <Grid>
            < Typography>
              Name: {name}
            </Typography>
            <Typography>
              Phone {phone}
            </Typography>
            <Typography>
              City: {city}
            </Typography>
          </Grid>
          <Grid>
            <CardActions>
              <Button size="small" onClick={deletePerson}>Delete</Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonCard;