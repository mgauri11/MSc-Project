import React from 'react'
import { useHistory } from 'react-router-dom';
import './Home.css'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

const Home = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push("/staff-login");
    }

    const handleContact = () => {
        history.push("/student-login");
    }

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

/*
{/*<div id="grid-container">
            
            <h2 className='title'>Feedback Booking System</h2>
            <img src={require('./uni.jpg')}  width="400" height="400"></img>
          
           
            <div className="button1">
                <Button  variant="danger" onClick={handleClick}>
                    Staff Login
                </Button>
                <Button variant="danger" onClick={handleContact}>
                    Student Login
                </Button>
            </div>
    
    </div>*/