import React from 'react';
import axios from "../../../../axios.config";
import {Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Controller, FormProvider, useForm} from "react-hook-form";


const PersonPopUpAddingForm = ({open, setOpen, setPersons}) => {
  const {handleSubmit, control, reset} = useForm();

  const handleClose = () => {
    setOpen(false);
    reset()
  };

  const handleAdd = (data) => {
    axios.post(`person/`, data)
      .then(res => {

        if (res.status === 201) {
          setPersons(persons => [...persons, data]);
          handleClose()
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  return (
    <Dialog open={open}>
      <DialogContent>
        <FormProvider {...handleSubmit}>
          <form onSubmit={handleSubmit(handleAdd)}>
            <Controller
              render={({field}) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  required
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type={"text"}
                />
              )}
              name="name"
              control={control}
            />
            <Controller
              render={({field}) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone"
                  required
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type={"text"}
                />
              )}
              name="phone"
              control={control}
            />
            <Controller
              render={({field}) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  required
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type={"text"}
                />
              )}
              name="city"
              control={control}
            />
            <Controller
              render={({field}) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Country"
                  required
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type={"text"}
                />
              )}
              name="country"
              control={control}
            />

            <DialogActions sx={{justifyContent: "center"}}>
              <Button onClick={() => handleClose()} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PersonPopUpAddingForm;