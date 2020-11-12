import React, { useState, useEffect } from 'react'
import axios from "axios"
//import Header from './Header/Header'
import Navbar from 'react-bootstrap/Navbar'
import './StaPage.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import SplitButton from 'react-bootstrap/SplitButton'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Logout from "../Logout/Logout"

const StaPage = () => {

    
    return (
        <div>
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
                    <Navbar className='Heading1'>Staff-Page</Navbar>
                </Navbar>
            </div>
            <div className="b1">
              <Logout />  
            </div>
           
            <div className="Dropdown">

                <SplitButton title=" Select Module" >
                    <Dropdown.Item >Python for Computation-CMT115</Dropdown.Item>
                    <Dropdown.Item >Java- CMT205</Dropdown.Item>
                </SplitButton >
               
            </div>
            <div className="Dropdown">
            <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Module</th>
                        <th>Time Slot</th>
                        <th>Student</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>16-01-2021</td>
                        <td>Python for computation- CMT115</td>
                        <td>14:00</td>
                        <td>Student-1</td>
                        </tr>
                        <tr>
                        <td>16-01-2021</td>
                        <td>Python for computation-CMT115</td>
                        <td>15:00</td>
                        <td>Student-2</td>
                        </tr>
                        <tr>
                        <td>18-01-2021</td>
                        <td>Python for computation-CMT115</td>
                        <td>14:30</td>
                        <td>Student-3</td>
                        </tr>
                    </tbody>
                </Table>
            
            </div>
            
            
        </div>
    ) 
}

export default StaPage;