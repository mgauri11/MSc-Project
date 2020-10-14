import React, { useState, useEffect } from 'react'
import axios from "axios"
//import Header from './Header/Header'
import './StuPage.css'
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Logout from "../Logout/Logout"
import Button from 'react-bootstrap/esm/Button'

const StuPage = () => {

    const [countries, setCountries] = useState([]);
    const [value,setValue]=useState('Select One');

    const handleConfirm = () => {
        alert('Are you sure you want to continue booking ?')
    }
    

    useEffect(() => {
        const fecthData = async () => {
            await axios.get("/api/info")
                .then(res => {
                    setCountries(res.data);
                    console.log(res.data);
                    console.log(res.data.data)
                });
        };
        fecthData();
        
    }, []);
    //console.log(countries)


    //logic for fetching token/jwt from the localstorage.
    /*const token = localStorage.getItem('jwt')
    if (token) {
        console.log("success")
    } else {
        console.log("kai pan")
    }*/
   
    

    return (
        <div  className='title'>
            <h2>Student Page</h2>
            <div className="b1">
                <Logout />
            </div>
            <div className='login-root'>
                <img src={require('./calender.jpg')} alt='cool image coming soon!!!! ;)' width="300" height="250" ></img>
                
            </div>
            {countries?.map((number) =>
            <div className="dropdown1">

                <DropdownButton title="Year" >
                    <Dropdown.Item >{number.Degree}</Dropdown.Item>
                </DropdownButton >
                <DropdownButton title="Course" >
                    <Dropdown.Item>{number.Degree_Program}</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title="Semester" >
                    <Dropdown.Item>{number.Semester}</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title="Module" >
                    <Dropdown.Item>{number.Module_name}</Dropdown.Item>
                </DropdownButton>
    
            </div>)} 
            <p className='p1'>Slots available</p>
            <Button variant="danger" onClick={handleConfirm}>Book</Button>
            
        </div>
    ) 
}

export default StuPage;