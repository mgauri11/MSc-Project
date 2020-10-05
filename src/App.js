import React from 'react';
import './App.css';
import Home from './Home/Home';
import StuLogin from './StuLogin/StuLogin';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import StaLogin from './StaLogin/StaLogin';
import StaPage from './StaPage/StaPage';
import StuPage from './StuPage/StuPage';


const App = () => {
  
       
  return (
    
      <Router>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/staff-login" exact component={StaLogin} />
            <Route path="/student-login" exact component={StuLogin} />
            <Route path="/staff-page" exact component={StaPage} />
            <Route path="/student-page" exact component={StuPage} />
          </Switch>
          
        </main>
      </Router>
     
    
);
}

export default App;