import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {Controller} from "react-hook-form";
import React from "react";

const ReactHookFormSelect = ({
                               name,
                               label,
                               control,
                               defaultValue,
                               children,
                               ...props
                             }) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        // render={
        //   <Select labelId={labelId} label={label}>
        //     {children}
        //   </Select>
        // }

        render={({field}) => (
          // <TextField
          //   {...field}
          //   fullWidth
          //   label="Name"
          //   required
          //   onChange={(e) => field.onChange(e)}
          //   value={field.value}
          //   type={"text"}
          // />
          <Select labelId={labelId} label={label}>
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;