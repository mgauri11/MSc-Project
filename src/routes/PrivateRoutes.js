
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router'
import { useHistory } from 'react-router-dom'




export const PrivateRoutes = ({ component, path, exact }) => {
  const history = useHistory()
  const [authenticated, setAuthenticated] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      setAuthenticated(true)
    } else {
      history.push('/')
    }
  }, [history])

  return authenticated ? (
    <Route component={component} path={path} exact={exact} />
  ) : null
}
