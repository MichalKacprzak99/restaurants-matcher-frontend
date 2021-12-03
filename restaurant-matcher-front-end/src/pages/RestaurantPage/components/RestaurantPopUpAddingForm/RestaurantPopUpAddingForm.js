import React from 'react';
import {Dialog, DialogActions, DialogContent, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Controller, FormProvider, useForm} from "react-hook-form";


const RestaurantPopUpAddingForm = ({open, setOpen, setRestaurants}) => {
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      test: "1",
    },
  });

  const handleClose = () => {
    setOpen(false);
    reset()
  };

  const handleAdd = (data) => {
    console.log(data)
    // axios.post(`restaurant/`, data)
    //   .then(res => {
    //
    //     if (res.status === 201) {
    //       setRestaurants(restaurants => [...restaurants, data]);
    //       handleClose()
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.error(error.response.data); // => the response payload
    //     }
    //   });
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
              render={() => (
                <TextField
                  select
                  fullWidth
                  defaultValue=""
                  label="Select"
                  required
                >
                  <MenuItem key="1" value="1">
                    test
                  </MenuItem>
                </TextField>
              )}
              name="test"
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

export default RestaurantPopUpAddingForm;