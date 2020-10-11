import React, { useEffect, useState } from "react";
import "./Line.css";
import {Line} from "react-chartjs-2";

function LineChart() {
  const [label, setLabel] = useState([])
  const [totalCase, setTotalLabel] = useState([])
  const [recovery, setRecovery] = useState([])

  useEffect(() => {
    fetch("https://data.nepalcorona.info/api/v1/covid/timeline")
      .then((response) => response.json())
      .then((data) => {
        const last = data.length - 2;
        const initialVal = last - 15 ;
        const finalData = data.slice(initialVal,last);
        var label = [];
        var totalCase = [];
        var recovery = []
        finalData.forEach((e) => {
         var date = e.date.split("-")[2];
         var cases = e.newCases;
         var recoveries = e.newRecoveries;
          label.push(date);
          totalCase.push(cases);
          recovery.push(recoveries)
        });
        setLabel(label);
        setTotalLabel(totalCase);
        setRecovery(recovery)
      })
      .catch((err) => console.log(err));
  }, []);
  const data = {
    labels: label,
    datasets: [
      {
        label: "New Cases",
        data: totalCase,
        borderColor: "#CC1034",
        borderWidth: "1",
      },
      {
        label: "Recoveries",
        data: recovery,
        borderColor: "#0000FF",
        borderWidth: "1",
      },
    ],
  };
  return (
    <div className="line-chart">
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: "Corona Virus Per Day in Last 15 Days",
            backgroundColor: "ffffff",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 2500,
                  stepSize: 150,
                  beginAtZero: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default LineChart;
