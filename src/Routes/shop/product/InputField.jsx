// InputField.js
import React from 'react';
import { Grid, TextField } from '@mui/material';

const InputField = ({ label, placeholder, name, id, value, onChange }) => {
  return (
    <Grid className="inputhead" container>
      <Grid className="inputheadInner" item xs={4} lg={3}>
        {label}
      </Grid>
      <Grid className="inputtexthead" container item xs={8} lg={9}>
        <TextField
          fullWidth
          required
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          // disabled
        />
      </Grid>
    </Grid>
  );
};

export default InputField;
