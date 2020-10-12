import React from 'react';
import './App.css';


import { Router,Route, Switch } from 'react-router-dom'
import { PrivateRoutes, privateRoutes, publicRoutes } from './routes'


const App = () => {
  
       
  return (
    
      <Router>
        <main>
          <Switch>
            {privateRoutes.map(({ id, path, component }) => (
              <PrivateRoutes key={id} path={path} component={component} exact />
            ))}
            {publicRoutes.map(({ id, path, component }) => (
              <Route key={id} path={path} component={component} />
            ))}
          </Switch>
          
        </main>
      </Router>
     
    
);
}

export default App;