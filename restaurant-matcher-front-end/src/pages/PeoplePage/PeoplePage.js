import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import axios from "../../axios.config";
import {PersonPopUpAddingForm, PersonCard} from "./components";

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
      justifyContent="center"
      alignItems="center"
    >
      {persons.map((person, index) => {
        return (
          <PersonCard key={index} person={person} setPersons={setPersons}/>
          )
      })}
      <Button onClick={() => setOpen(true)}>
        Add new person
      </Button>
      <PersonPopUpAddingForm open={open} setOpen={setOpen} setPersons={setPersons}/>

    </Grid>
  )

}
export default PeoplePage;