import React from 'react'
import { useHistory } from 'react-router-dom';
import './Home.css'

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
            <div className='title'>
                <h1 >Feedback Booking System</h1>
            </div>
            <div className='img'>
                <img src={require('./school.jpg')} alt='cool image coming soon!!!! ;)' width="500" height="500" ></img>
            </div>
            <div>
                <p className="p1">The system allows staff and students to manage the feedback bookings.Work is in progress to get the basic functionalities and testing ready!!</p>
            </div>
           
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

export default Home;