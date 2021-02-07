import React from 'react'
import { useHistory } from 'react-router-dom';
import './Home.css'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

// // Reference for React Bootstrap components was taken from: Navbar : https://react-bootstrap.github.io/components/navbar/ & Button: https://react-bootstrap.github.io/components/buttons/

const Home = () => {
    const history = useHistory(); // Method defined/used for redirecting to specified pages
    const handleClick = () => {
        history.push("/staff-login");
    }

    const handleContact = () => {
        history.push("/student-login");
    }
//Cardiff University logo is taken from:https://www.google.com/search?q=cardiff%20university%20logo&tbm=isch&hl=en-US&tbs&rlz=1C1GIWA_enIN620IN620&sa=X&ved=0CAEQpwVqFwoTCKi08oft5O0CFQAAAAAdAAAAABAD&biw=1349&bih=657#imgrc=V6YmVz-cWSYWSM
    return (
        <div id="grid-container">
            <div >
                <Navbar bg="dark" expand="xl">
                    <Navbar.Brand>
                    <img
                        alt="School-Image"
                        src={require('./logo.jpg')}
                        width="200"
                        height="200"
                        className="img"
                    />{' '}
                    </Navbar.Brand>
                    <Navbar className='title'>Feedback Booking System- COMSC</Navbar>
                </Navbar>
            </div>
            <div className='Row-2'>
                <p>This system allows inidividual students to book feedback sessions for the assessed coursework/exam with appropriate staff member. Moreover, it gives platform to individual students to ask for further feedback on their assessed courework/exams. 
                    
                </p>
            </div>
            <div className='Row-3'>
                <Button variant="danger" onClick={handleClick}>Staff-Login</Button>
               
            </div>
            <div className='Row-4'>
                <Button variant="danger" onClick={handleContact}>Student-Login</Button>
            </div>   
        </div>
        
    ) 
}

export default Home;

