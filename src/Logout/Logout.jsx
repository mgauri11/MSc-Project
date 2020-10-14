import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const Logout = () => {
    const history = useHistory();
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