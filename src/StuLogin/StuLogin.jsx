import React from 'react'
import './StuLogin.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card} from '@blueprintjs/core'


const StuLogin = () => {
    const handleSubmit = () => {
       console.log("Testing")
    }

    
    return (
        <div id='login-root'>
            <h1>Student-Login</h1>
            <Card className='login-wrapper' >
                <div className='login-container card'>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        
                        <Button id="Button" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>
            </Card>
            

        </div>
       
    ) 
}

export default StuLogin;