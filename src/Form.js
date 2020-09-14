import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Checkbox, FormGroup } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './Form.css';
import {db} from './firebase';

function Form() {
    const [fullname, setFullname] = useState("");
    const handleFullname = (e) => {
        setFullname(e.target.value);
    };
const currencies = [
    {
      value: 'Provience 1',
      label: 'Provience 1',
    },
    {
        value: 'Provience 2',
        label: 'Provience 2',
      },
      {
        value: 'Provience 3',
        label: 'Provience 3',
      },
      {
        value: 'Provience 4',
        label: 'Provience 4',
      },
      {
        value: 'Provience 5',
        label: 'Provience 5',
      },
      {
        value: 'Provience 6',
        label: 'Provience 6',
      },
   
  ];
  const [provience, setProvience] = useState('Procience 1');

  const handleProvience = (event) => {
    setProvience(event.target.value);
  };
  const [thought, setThought] = useState('female');

  const handleThought = (event) => {
    setThought(event.target.value);
  };

  const [state, setState] = React.useState({
    Student: true,
    Guardent: false,
  });
  const [responsibility, setResponsibility] = useState([])
  useEffect(() => {
      if (state.Student == true && state.Guardent == true) {
        setResponsibility([Student, Guardent]);
      } else if (state.Student == true && state.Guardent == false ) {
        setResponsibility([Student , null]);
      } else {
        setResponsibility([null , Guardent]);
      }
  }, [state])
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleSubmit = e => {
    e.preventDefault();
   storeDB('Users');
   if (responsibility[1]) {
    storeDB('Student');
   }
   
   if (responsibility[2]) {
    storeDB('Guardent');
   }
  };

  const storeDB = (group) => {
      db.collection(group).set ({
          fullname,
          provience,
          responsibility,
          thought,
      });
  }
  const { Student, Guardent} = state;
  return (
      <div className="form">
    <form className="form__table" method="post" >
    <TextField className="fullname"  value={fullname} onChange={handleFullname} id="outlined-basic" label="Full Name" variant="outlined" />
    <TextField
    className="provience"
          select
          label="Select Your Provision"
          value={provience}
          onChange={handleProvience}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your provience"
          variant="outlined"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <FormControl component="fieldset" className="responsibility" >
        <FormLabel component="legend">Responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={Student} onChange={handleChange} name="Student" />}
            label="Student"
          />
          <FormControlLabel
            control={<Checkbox checked={Guardent} onChange={handleChange} name="Guardent" />}
            label="Gardient"
          />
        </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className="thought">
      <FormLabel component="legend">Do you think taking exam in this condition is right?</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={thought} onChange={handleThought}>
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />

      </RadioGroup>
    </FormControl>
    <Button type="submit" className="submit-btn" onClick = {handleSubmit} variant="contained" color="primary" href="#contained-buttons">
  Submit <SendIcon/>
</Button>
      </form>
    </div>
  )
}

export default Form
