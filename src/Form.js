import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import "./Form.css";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";

import { Link } from "react-router-dom";

function Form() {
  let history = useHistory();
  const [textarea, setTextarea] = useState("")
  const [fullname, setFullname] = useState("");
  const handleFullname = (e) => {
    setFullname(e.target.value);
  };
  const currencies = [
    {
      value: "province 1",
      label: "Province 1",
    },
    {
      value: "province 2",
      label: "Province 2",
    },
    {
      value: "province 3",
      label: "Province 3",
    },
    {
      value: "province 4",
      label: "Province 4",
    },
    {
      value: "province 5",
      label: "Province 5",
    },
    {
      value: "province 6",
      label: "Province 6",
    },
  ];
  const [province, setprovince] = useState("Procience 1");

  const handleprovince = (event) => {
    setprovince(event.target.value);
  };
  const [thought, setThought] = useState("female");

  const handleThought = (event) => {
    setThought(event.target.value);
  };

  const [state, setState] = React.useState({
    Student: true,
    Guardent: false,
  });
  const [responsibility, setResponsibility] = useState([]);


  useEffect(() => {
    if (state.Student === true && state.Guardent === true) {
      setResponsibility([Student, Guardent]);
    } else if (state.Student === true && state.Guardent === false) {
      setResponsibility([Student, null]);
    } else {
      setResponsibility([null, Guardent]);
    }
  }, [state]);

  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullname !== "") {
      storeDB("test");
      
      history.replace("/info");
    } else {
      alert("Full name missing");
    }
  };

  const storeDB = (group) => {
    db.collection(group).doc(fullname).set({
      fullname,
      province,
      responsibility,
      thought,
      textarea,
    });
  };
  const { Student, Guardent } = state;
  const handleTextarea =  (e) => {
    setTextarea(e.target.value)
  } 
  return (
    <div className="form">
      <form className="form__table" method="post">
        <h3 className="title">Opinion on Examination To be Held on 2020 </h3>
        <TextField
          className="fullname"
          value={fullname}
          onChange={handleFullname}
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          required
        />
        <TextField
          className="province"
          required
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
        <FormControl component="fieldset" className="responsibility">
          <FormLabel component="legend">You are:</FormLabel>
          <FormGroup required>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Student}
                  onChange={handleChange}
                  name="Student"
                />
              }
              label="Student"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Guardent}
                  onChange={handleChange}
                  name="Guardent"
                />
              }
              label="Guardian"
            />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className="thought" required={true}>
          <FormLabel component="legend">
            Do you think taking exam in this condition is right?
          </FormLabel>
          <RadioGroup value={thought} onChange={handleThought} required>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <textarea cols="30" rows="10" value={textarea} onChange={handleTextarea} placeholder="Any Sugggestion or Opinion Here(Optional)" style={{border:'none', width:"300px"}}></textarea>
        <Button
          type="submit"
          className="submit-btn"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          href="#contained-buttons"
        >
          Submit <SendIcon />
        </Button>
      </form>
      
      <Link to="/info">
        {" "}
        <i>Skip</i>
      </Link>
    </div>
  );
}

export default Form;
