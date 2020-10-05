import React from 'react';
import './App.css';
import Home from './Home/Home'

import { BrowserRouter as Router, Route,Switch } from "react-router-dom";


const App = () => {
  
       
  return (
    
      <Router>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            
          </Switch>
          
        </main>
      </Router>
     
    
);
}

export default App;