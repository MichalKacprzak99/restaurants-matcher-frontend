import React from 'react';
import axios from "../../../../axios.config";
import {Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Controller, FormProvider, useForm} from "react-hook-form";


const CuisinePopUpAddingForm = ({open, setOpen, setCuisines}) => {
  const {handleSubmit, control, reset} = useForm();

  const handleClose = () => {
    setOpen(false);
    reset()
  };

  const handleAdd = (data) => {
    axios.post(`cuisine/`, data)
      .then(res => {

        if (res.status === 201) {
          setCuisines(cuisines => [...cuisines, data]);
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
            <DialogActions>
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

export default CuisinePopUpAddingForm;