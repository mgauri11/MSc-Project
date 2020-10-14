import React, { useState, useEffect } from 'react'
//import './Header.css'

const PrivateRoute = () => {

    const token = localStorage.getItem('token')
    if (token) {
        console.log("success")
    } else {
        console.log("kai pan")
    }

    

    return (
        <div  className='title'>
            <p className='p'>Ugach timepass!!! :D</p>
            
        </div>
    ) 
}

export default PrivateRoute;