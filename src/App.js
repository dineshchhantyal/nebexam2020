import React from 'react';
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
    </Router>
  );
}

export default App;
