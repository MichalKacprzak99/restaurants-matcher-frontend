import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import axios from "../../axios.config";
import {PersonCard, PersonPopUpAddingForm} from "./components";

const PeoplePage = () => {
  const [persons, setPersons] = useState([])
  const [open, setOpen] = React.useState(false);

  const fetchData = () => {
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
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {persons.map((person, index) => {
          return (
            <Grid key={index} item>
              <PersonCard person={person} setPersons={setPersons}/>
            </Grid>
          )
        })}
      </Grid>
      <Grid item>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
          Add new person
        </Button>
      </Grid>

      <PersonPopUpAddingForm open={open} setOpen={setOpen} setPersons={setPersons}/>

    </Grid>
  )

}
export default PeoplePage;