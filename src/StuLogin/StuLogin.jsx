import React, { useState } from 'react'
import axios from "axios";
import './StuLogin.css'
import { useHistory } from 'react-router-dom';
import { Card, Button, FormGroup, InputGroup } from '@blueprintjs/core'


const StuLogin = () => {
    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = (event) => {
        history.push("/student-page");
        event.preventDefault();
        
        const userData = {
            email,
            password
        }
        axios.post("/api/auth/register_login", userData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
        });
    };


    
    return (
        <div id='login-root'>
            <h1>Student-Login</h1>
            <Card className='login-wrapper'>
                <div className='login-container card'>
                    <form>
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
                        <Button onClick={handleSubmit}  data-testid='submit-button'>Login</Button>
                    </form>
                </div>
                        
            </Card>
        </div>
       
    ) 
}

export default StuLogin;