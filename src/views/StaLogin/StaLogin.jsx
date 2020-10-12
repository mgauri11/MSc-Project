import React, { useState } from 'react'
import axios from "axios";
import './StaLogin.css'
import { useHistory } from 'react-router-dom';
//import Alert from 'react-bootstrap/Alert'
import { Card, Button, FormGroup, InputGroup } from '@blueprintjs/core'


export const StaLogin = () => {
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
            <h3 id="h1">Staff-Login</h3>
            <Card className='login-wrapper'>
                <div className='login-container card'>
                    <form >
                    
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
