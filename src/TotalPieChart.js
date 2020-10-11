import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { db } from "./firebase";
import LineChart from "./Line";
import Message from "./Message";
import Pie from "./Pie";
import "./TotalPieChart.css";

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
  const [textArea, setTextArea] = useState([]);
  useEffect(() => {
    db.collection("Users").onSnapshot((doc) => {
      setTotalSubmission(doc.docs.length);

      let y = 0;
      let n = 0;
      let sy = 0;
      let sn = 0;
      let st = 0;
      let py = 0;
      let pn = 0;
      let pt = 0;
      doc.forEach((e) => {
        const { textarea, fullname } = e.data();
        if (textarea) {
          setTextArea((textArea) => [...textArea, { fullname, textarea }]);
        }

        const q = e.data().thought; //Yes no

        if (q === "Yes") {
          y++;
        } else {
          n++;
        }
        setTotalYesSubmission(y);
        setTotalNoSubmission(n);
        if (e.data().responsibility[1]) {
          pt++;
          if (q === "Yes") {
            py++;
          } else {
            pn++;
          }
          //push to parent
          setParentYesSubmission(py);
          setParentNoSubmission(pn);
          setParentSubmission(pt);
        }
        if (e.data().responsibility[0]) {
          st++;
          if (q === "Yes") {
            sy++;
          } else {
            sn++;
          }
          //push to student
          setStudentYesSubmission(sy);
          setStudentNoSubmission(sn);
          setStudentSubmission(st);
        }
      });
    });
  }, []);
  const per = (total, val) => (val / total) * 100;
  return (
    <div className="body">
      <p className="thankyou" id="top">
        {" "}
        Thank You For Your Submission!{" "}
      </p>
      <div className="yes__no">
        <Pie
          title={`Analysis Among Total Submission (Total : ${totalSubmission})`}
          inFavour={totalYesSubmission}
          Aganist={totalNoSubmission}
          yp={per(totalSubmission, totalYesSubmission)}
          np={per(totalSubmission, totalNoSubmission)}
        />
        <Pie
          title={`Analysis Among Guardian Submission  (Total : ${totalParentSubmission})`}
          inFavour={totalYesParentSubmission}
          Aganist={totalNoParentSubmission}
          yp={per(totalParentSubmission, totalYesParentSubmission)}
          np={per(totalParentSubmission, totalNoParentSubmission)}
        />
        <Pie
          title={`Among Student Submission  (Total : ${totalStudentSubmission})`}
          inFavour={totalYesStudentSubmission}
          Aganist={totalNoStudentSubmission}
          yp={per(totalStudentSubmission, totalYesStudentSubmission)}
          np={per(totalStudentSubmission, totalNoStudentSubmission)}
        />
      </div>
      <Message textArea={textArea} />

      {/* <LineChart /> */}

      <footer>
        <div className="message">
          <h3 className="meassge__title">So What Next??</h3>
          <p>
            This reading is not taken by government official . So, To drag eyes
            of government on this analysis please, do share this analysis on
            different social platform .
          </p>
        </div>
        <div className="for__offical">
          <p>
            This analysis is not based on any dummy data and we don't promote
            any act against the government of Nepal.
          </p>
        </div>
        <a href="#top" className="backtop">
          <Button className="backtotop">Back To Top</Button>
        </a>
      </footer>
    </div>
  );
}

export default TotalPieChart;
