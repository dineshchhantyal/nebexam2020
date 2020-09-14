import { green } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";

import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Pie from "./Pie";
import "./TotalPieChart.css";
import { Slider, Typography } from "@material-ui/core";

function TotalPieChart() {
  const [totalSubmission, setTotalSubmission] = useState(0);
  const [totalParentSubmission, setParentSubmission] = useState(0);
  const [totalStudentSubmission, setStudentSubmission] = useState(0);
  const [totalYesSubmission, setTotalYesSubmission] = useState(0);
  const [totalNoSubmission, setTotalNoSubmission] = useState(0);
  const [totalYesParentSubmission, setParentYesSubmission] = useState(0);
  const [totalNoParentSubmission, setParentNoSubmission] = useState(0);
  const [totalYesStudentSubmission, setStudentYesSubmission] = useState(0);
  const [totalNoStudentSubmission, setStudentNoSubmission] = useState(0);

useEffect(() => {
    db.collection("Users")
    .get()
    .then((doc) => {
      setTotalSubmission(doc.Uf.docChanges.length);
      let y = 0;
      let n = 0;
      doc.forEach((e) => {
        const q = e.data().thought;
        if (q == "Yes") {
          y++
        } else {
          n++
        }
      });
      
      setTotalYesSubmission(y);
      setTotalNoSubmission(n);
    })
    .catch((err) => {
      console.log(err);
    });
  db.collection("Parent")
    .get()
    .then((doc) => {
      setParentSubmission(doc.Uf.docChanges.length);
      let y = 0;
      let n = 0;
      doc.forEach((e) => {
        const q = e.data().thought;
        if (q == "Yes") {
          y++
        } else {
          n++
        }
      });
      setParentYesSubmission(y);
      setParentNoSubmission(n);
    })
    .catch((err) => {
      console.log(err);
    });
  db.collection("Student")
    .get()
    .then((doc) => {
      setStudentSubmission(doc.Uf.docChanges.length);
      let y = 0;
      let n = 0;
      doc.forEach((e) => {
        const q = e.data().thought;
        if (q == "Yes") {
          y++
        } else {
          n++
        }
      });
      setStudentYesSubmission(y);
      setStudentNoSubmission(n);
    })
    .catch((err) => {
      console.log(err);
    });
}, [])
 
  return (
    <div className="body">
      {/* { "" : "<p> Thanks For Your Submission </p>"} */}
      <div className="boxes">
        <div className="totalSubmission box">
          Total Submission
          <p className="num"> {totalSubmission} </p>
        Total with Yes = {totalYesSubmission} <br />
          Total with No = {totalNoSubmission}
        </div>
        <div className="totalSubmission box">
          Total Student Submission
          <p className="num"> {totalStudentSubmission} </p>
          Student with Yes = {totalYesStudentSubmission} <br/>
          Student with No = {totalNoStudentSubmission}
        </div>
        <div className="totalSubmission box">
          Total Guardian Submission
          <p className="num"> {totalParentSubmission} </p>
          Guardian with Yes = {totalYesParentSubmission} <br/>
          Guardian with No = {totalNoParentSubmission}
         
        </div>
      </div>
      <h2> Data Aanalysis </h2>
      <h4 style={{ color: green }}> This page is in under development phase </h4>
      <Pie />
    </div>
  );
}

export default TotalPieChart;
