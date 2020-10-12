import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute, privateRoutes, publicRoutes } from './routes'


const App = () => {
  
       
  return (
      <div>
        <Switch>
          {privateRoutes.map(({ id, path, component }) => (
            <PrivateRoute key={id} path={path} component={component} exact />
          ))}
          {publicRoutes.map(({ id, path, component }) => (
            <Route key={id} path={path} component={component} />
          ))}
        </Switch>
        
      </div>
      
     
    
);
}

export default App;