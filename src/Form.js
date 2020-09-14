import React, { useEffect, useState, useHistory } from 'react';
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
    history = useHistory();
    const [fullname, setFullname] = useState("");
    const handleFullname = (e) => {
        setFullname(e.target.value);
    };
const currencies = [
    {
      value: 'province 1',
      label: 'province 1',
    },
    {
        value: 'province 2',
        label: 'province 2',
      },
      {
        value: 'province 3',
        label: 'province 3',
      },
      {
        value: 'province 4',
        label: 'province 4',
      },
      {
        value: 'province 5',
        label: 'province 5',
      },
      {
        value: 'province 6',
        label: 'province 6',
      },
   
  ];
  const [province, setprovince] = useState('Procience 1');

  const handleprovince = (event) => {
    setprovince(event.target.value);
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
    const a = db.collection('Users');
    console.log(a);
     storeDB('Users');
   if (responsibility[1] === true) {
    storeDB('Student');
   };
   
   if (responsibility[2] === true) {
    storeDB('Parent');
   };

  };

  const storeDB = (group) => {
      db.collection(group).doc(fullname).set({
          fullname,
          province,
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
    className="province"
          select
          label="Select Your Province"
          value={province}
          onChange={handleprovince}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your province"
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
