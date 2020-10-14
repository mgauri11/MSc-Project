import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const Logout = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push("/");
    }
    return (
      <div>
        <Button className="button" variant="danger" onClick={handleClick}>Logout</Button>
      </div>
    );
}

export default Logout;