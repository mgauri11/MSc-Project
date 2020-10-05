import React from 'react';
import './App.css';
import Home from './Home/Home';
import StuLogin from './StuLogin/StuLogin';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import StaLogin from './StaLogin/StaLogin';


const App = () => {
  
       
  return (
    
      <Router>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/staff-login" exact component={StaLogin} />
            <Route path="/student-login" exact component={StuLogin} />
            
          </Switch>
          
        </main>
      </Router>
     
    
);
}

export default App;