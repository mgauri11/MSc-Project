import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
//import { UserAgentApplication } from 'msal';
//import { msalConfig, loginRequest, tokenRequest} from '../config';

const Logout = () => {
    const history = useHistory();
    //const myMSALObj = new UserAgentApplication(msalConfig);
    //const username = "";
    
    const handleClick = () => {
        history.push("/");
    }
    return (
      <div className="button2">
        <Button  variant="danger" onClick={handleClick}>Logout</Button>
      </div>
    );
}

export default Logout;