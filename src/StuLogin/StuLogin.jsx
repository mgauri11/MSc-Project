import React, { useEffect, useState } from 'react'
import './StuLogin.css'
import * as Msal from 'msal';
import { getUserDetails,getEvents } from '../GraphService';
import { msalConfig} from '../config';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { Card, FormGroup, InputGroup } from '@blueprintjs/core'
import Alert from 'react-bootstrap/Alert'


const StuLogin = () => {
  
        
    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const userAgentApplication = new Msal.UserAgentApplication({
        auth: {
            clientId: msalConfig.clientId,
            redirectUri: msalConfig.redirectUri
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: true
        }
    });
     
    //sign-in function for Microsoft account login
    const signIn = async () => {

        await userAgentApplication.loginPopup(msalConfig.scopes); 
        await getUserProfile();
     
    }
    //sign-out function for Microsoft account logout
    const signOut = () => {
        userAgentApplication.logout();
    }
    const handlePush = () =>{

      history.push("/student-page");

    }
   
    //Function for getting the access token for all the defined scopes.
    const getAccessToken = async (scopes) => {
        try{
            var silentToken =  await  userAgentApplication.acquireTokenSilent({
                // Acquire token silent success
                scopes: scopes  
            });
            return silentToken.accessToken;
        }
        catch (err) {
            // If a silent request fails, it may be because the user needs
            // to login or grant consent to one or more of the requested scopes
            if ( isInteractionRequired(err)) {
              var interactiveResult = await userAgentApplication.acquireTokenPopup({
                scopes: scopes
              });
    
              return interactiveResult.accessToken;
            } else {
              throw err;
            }
          }

    }
    //Function verifying user profile for accessing the scopes defined.
    const getUserProfile = async () => {
        try {
            console.log(msalConfig.scopes);
          var accessToken = await getAccessToken(msalConfig.scopes);
          //console.log(accessToken)
          
          if (accessToken) {
            // Get the user's profile from Graph
            var  user =  await getUserDetails(accessToken);
            console.log("it's working!!!")
            
          }
        }
        catch(err) {
          console.log(err);
        }
    }
    

    
    const isInteractionRequired = (error) => {
        if (!error.message || error.message.length <= 0) {
          return false;
        }
  
        return (
          error.message.indexOf('consent_required') > -1 ||
          error.message.indexOf('interaction_required') > -1 ||
          error.message.indexOf('login_required') > -1
        );
    }
    
    // function for student login using server side POST request
    /*const handleSubmit = (event) => {    
        
        event.preventDefault();
        
        const userData = {
           
            email,
            password
        }
        axios.post("/users/login", userData)
        .then(res => {
            console.log(res);
            if(res){
                alert("successfully logged in")
                
            }
            else{
                alert("Enter correct details")
            }
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
        });
        
    };*/ 
    
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
                    <Navbar className='Heading'>Student-Login</Navbar>
                    
                </Navbar>
            </div>
            <div>
                <Alert className="alert" variant="warning">
                    Note: This application is integrated with  Microsoft Outlook Calendar API, so you can enter anything in email and password field and press login and then finally click the blue button below! If you want to know why these steps are followed,please feel free to ask for clarification!
                </Alert>
            </div>
            <Button variant="primary" className='button_out' onClick={handlePush}  data-testid='submit-button'>Click to access page after login</Button>   
                           
          <Card className='login-wrapper'>
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
                <Button variant="danger" className='button_stu' onClick={signIn}  data-testid='submit-button'>Login</Button>
                {<Button variant="danger" className='button_stu' onClick={signOut}  data-testid='submit-button'>Logout</Button>}
                
            </div>
          </Card> 
          
        </div>
    ) 
}
export default StuLogin;
 