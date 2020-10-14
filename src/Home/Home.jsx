import React from 'react'
import { useHistory } from 'react-router-dom';
import './Home.css'
import Button from 'react-bootstrap/Button'

const Home = () => {
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
          
           
            <div className="button">
                <button  variant="danger" onClick={handleClick}>
                    Staff Login
                </button>
                <button variant="danger" onClick={handleContact}>
                    Student Login
                </button>
            </div>
    
        </div>
    ) 
}

export default Home;