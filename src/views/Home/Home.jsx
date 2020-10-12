import React from 'react'
import { useHistory } from 'react-router-dom';
import './Home.css'

export const Home = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push("/staff-login");
    }

    const handleContact = () => {
        history.push("/student-login");
    }

    return (
        <div class="grid-container">
            
            <h2 className='title'>Feedback Booking System</h2>
            <img src={require('./uni.jpg')}  width="400" height="550"></img>
          
           
            <div className="btn-group">
                <button type="button" onClick={handleClick}>
                    Staff Login
                </button>
                <button type="button" onClick={handleContact}>
                    Student Login
                </button>
            </div>
    
        </div>
    ) 
}

