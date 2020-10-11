import React from "react";
import "./Pie.css";
import Chart from "react-chartjs-2";
function Pie({title , inFavour, Aganist, yp, np}) {


  const data = {
    labels:[`in Favour ${yp.toFixed(2)}%` , `Against ${np.toFixed(2)}%`],
    datasets : [
      {
        data : [inFavour,Aganist],
        backgroundColor:['rgba(106, 90, 205,1)','rgba(245, 20, 20, 0.6)'],
      }
    ]
  } 
  
  return (
    <div className="pie__chart">
     <Chart data = {data} options={{
       title : {
         display:true,
         text : title,
       }
     }}
   />
    </div>
  );
}

export default Pie;
