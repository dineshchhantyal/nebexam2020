<<<<<<< HEAD
import React from "react";
import "./App.css";
import Form from "./Form";
import "./TotalPieChart";
import TotalPieChart from "./TotalPieChart";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/details">
            <TotalPieChart />
          </Route>
          <Route path="/">
            <Form />
          </Route>
        </Switch>
      </div>
=======
import React, { useState } from 'react';
import './App.css';
import Form from './Form';
import './TotalPieChart'
import TotalPieChart from './TotalPieChart';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="app">
      <Switch>
     
      <Route path="/info">
      <TotalPieChart/>
      </Route>
      <Route path="/">
      <Form />
      </Route>
      </Switch>
    </div>
>>>>>>> 20a1c9da88c7863e41d162307c298b7c926e52fd
    </Router>
  );
}

export default App;
