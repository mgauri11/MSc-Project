import React, { useState } from 'react'
import axios from "axios";
import './StaLogin.css'
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { Card,Elevation,  FormGroup, InputGroup } from '@blueprintjs/core'
import AppToaster from '../StuPage/Toaster';
import Alert from 'react-bootstrap/Alert'

const StaLogin = () => {
    const history = useHistory();
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = (event) => {    
        
        event.preventDefault();
        
        const userData = {
           
            email,
            password
        }
        axios.post("/staff/staff_login", userData)
        .then(res => {
            AppToaster.show({ message: 'Successfully logged in', intent: 'success' ,timeout: 1000});
            history.push("/staff-page");
            console.log(res);
            
        })
        .catch(err => {
            AppToaster.show({ message: 'Login failed.Please try again.', intent: 'danger' ,timeout: 5000});
            console.log(err);
            console.log(err.response);
        });
        
    };
    
    

//Cardiff University logo is taken from:https://www.google.com/search?q=cardiff%20university%20logo&tbm=isch&hl=en-US&tbs&rlz=1C1GIWA_enIN620IN620&sa=X&ved=0CAEQpwVqFwoTCKi08oft5O0CFQAAAAAdAAAAABAD&biw=1349&bih=657#imgrc=V6YmVz-cWSYWSM
    
    return (
        <div id='login-root'>
            <div >
                <Navbar bg="light" expand="sm">
                    <Navbar.Brand>
                    <img
                        alt="School-Image"
                        src={require('../Home/logo.jpg')}
                        width="70"
                        height="70"
                        className="img"
                    />{' '}
                    </Navbar.Brand>
                    <Navbar className='Heading'>Staff-Login</Navbar>
                </Navbar>
            </div>
            <div>
                <Alert className="alert_staff" variant="warning">
                    Please use following login details: 
                    Email: PhillipsHR@cardiff.ac.uk
                    Password: PhillipsHR
                </Alert>
            </div>
            <Card className='login-wrapper' elevation={Elevation.TWO}>
                <div className='login-container'>
                    
                    
                        <FormGroup
                        label='Email'
                        labelFor='username-input'
                        >
                            <InputGroup
                                id='username-input'
                                data-testid='username-input'
                                name="email"   
                                onChange= {event => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </FormGroup>

                        <FormGroup
                        label='Password'
                        labelFor='password-input'
                        >
                            <InputGroup
                                type='password'
                                id='password-input'
                                data-testid='password-input'
                                name="password"   
                                onChange={event => setPassword(event.target.value)}
                            />
                        </FormGroup>
                        <Button variant="danger" className="button" onClick={handleSubmit}  data-testid='submit-button'>Login</Button>
                        
                
                </div>
                        
            </Card>
        </div>
       
    ) 
}
export default StaLogin