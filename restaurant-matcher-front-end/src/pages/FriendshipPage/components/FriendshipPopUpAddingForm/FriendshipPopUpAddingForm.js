import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import axios from "../../../../axios.config";
import Grid from "@mui/material/Grid";


const FriendshipPopUpAddingForm = ({open, setOpen, setFriendship}) => {
  const [persons, setPersons] = useState([])

  const {handleSubmit, reset, register} = useForm({});


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


  const handleClose = () => {
    setOpen(false);
    reset()
  };


  const handleAdd = (data) => {
    const friendship = {members: [data.firstPerson, data.secondPerson]}
    axios.post(`friendship/`, friendship)
      .then(res => {
        if (res.status === 201) {
          setFriendship(restaurants => [...restaurants, friendship]);
          handleClose()
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }


  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <Dialog open={open} sx={{minWidth: 500}}>
      <DialogContent sx={{minWidth: 500}}>
        <form onSubmit={handleSubmit(handleAdd)}>
          <Grid container direction={"row"} spacing={2}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="First person"
                defaultValue=''
                inputProps={register('firstPerson', {
                  required: 'Please set first person',
                })}
              >
                {persons.map((person, index) => (
                  <MenuItem key={index} value={person.name}>
                    {person.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Second person"
                defaultValue=''
                inputProps={register('secondPerson', {
                  required: 'Please set second person',
                })}
              >
                {persons.map((person, index) => (
                  <MenuItem key={index} value={person.name}>
                    {person.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

          </Grid>
          <DialogActions sx={{justifyContent: "center"}}>
            <Button onClick={() => handleClose()} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FriendshipPopUpAddingForm;