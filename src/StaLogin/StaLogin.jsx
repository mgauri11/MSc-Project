import React, { useState } from 'react'
import axios from "axios";
import './StaLogin.css'
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
//import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Card,Elevation,  FormGroup, InputGroup } from '@blueprintjs/core'


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
            console.log(res);
            if(res){
                alert("successfully logged in")
                history.push("/staff-page");
            }
            else{
                alert("Enter correct details")
            }
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
        });
        
    };
    
    


    
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