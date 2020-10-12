import React from 'react';
import './App.css';
import { BrowserRouter,Route, Switch } from 'react-router-dom'
import { PrivateRoutes, privateRoutes, publicRoutes } from './routes'


const App = () => {
  
       
  return (
    
     
      <BrowserRouter>
        <Switch>
          {privateRoutes.map(({ id, path, component }) => (
            <PrivateRoutes key={id} path={path} component={component} exact />
          ))}
          {publicRoutes.map(({ id, path, component }) => (
            <Route key={id} path={path} component={component} />
          ))}
        </Switch>
        
      </BrowserRouter>
      
     
    
);
}

export default App;