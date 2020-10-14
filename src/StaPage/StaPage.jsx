import React, { useState, useEffect } from 'react'
import axios from "axios"
//import Header from './Header/Header'
import './StaPage.css'
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Logout from "../Logout/Logout"

const StaPage = () => {

    
    return (
        <div  className='title'>
            <h2>Staff Page</h2>
            <div className="b1">
                <Logout />
            </div>
            <div className="p2">
                <p >Information related to Feedback booking sessions can be viewed here!</p>
            </div>

            
           
            <div className="Dropdown">

                <SplitButton title=" Select Module" >
                    <Dropdown.Item >Module-1</Dropdown.Item>
                    <Dropdown.Item >Module-2</Dropdown.Item>
                    <Dropdown.Item >Module-3</Dropdown.Item>
                </SplitButton >
                <SplitButton title="Select Assessment" >
                    <Dropdown.Item>Class-test</Dropdown.Item>
                    <Dropdown.Item>Exam</Dropdown.Item>
                </SplitButton>
                <SplitButton title="List of students" >
                    <Dropdown.Item>Test Test</Dropdown.Item>
                    <Dropdown.Item>Student Student</Dropdown.Item>
                </SplitButton>
                
    
            </div>
            
            
        </div>
    ) 
}

export default StaPage;