import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import axios from "../../../../axios.config";


const RestaurantPopUpAddingForm = ({open, setOpen, setRestaurants}) => {
  const [cuisines, setCuisines] = useState([])
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


  const fetchCuisines = () => {
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


  const handleClose = () => {
    setOpen(false);
    reset()
  };


  const handleAdd = (data) => {
    axios.post(`restaurant/`, data)
      .then(res => {
        if (res.status === 201) {
          setRestaurants(restaurants => [...restaurants, res.data]);
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
    fetchCuisines();
  }, []);

  return (
    <Dialog open={open}>
      <DialogContent>
        <form onSubmit={handleSubmit(handleAdd)}>
          <TextField
            fullWidth
            label="Name"
            required
            type={"text"}
            inputProps={register('name', {
              required: 'Please set name',
            })}
          />
          <TextField
            fullWidth
            label="City"
            required
            type={"text"}
            inputProps={register('city', {
              required: 'Please set city',
            })}
          />
          <TextField
            fullWidth
            label="Country"
            required
            type={"text"}
            inputProps={register('country', {
              required: 'Please set country',
            })}
          />

          <TextField
            select
            fullWidth
            label="Owner"
            defaultValue=''
            inputProps={register('owner', {
              required: 'Please set owner',
            })}
          >
            {persons.map((person, index) => (
              <MenuItem key={index} value={person}>
                {person.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Cuisine"
            defaultValue=''
            inputProps={register('cuisine', {
              required: 'Please set cuisine',
            })}
          >
            {cuisines.map((cuisine, index) => (
              <MenuItem key={index} value={cuisine}>
                {cuisine.name}
              </MenuItem>
            ))}
          </TextField>
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

export default RestaurantPopUpAddingForm;