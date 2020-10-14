import React, { useState, useEffect } from 'react'
import axios from "axios"
//import Header from './Header/Header'
import './StuPage.css'
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Logout from "../Logout/Logout"

const StuPage = () => {

    const [countries, setCountries] = useState([]);
    const [value,setValue]=useState('Select One');
    

    useEffect(() => {
        const fecthData = async () => {
            await axios.get("/api/info")
                .then(res => {
                    setCountries(res.data);
                    console.log(res.data);
                });
        };
        fecthData();
        
    }, []);
    //console.log(countries)
   
    

    return (
        <div  className='title'>
            <h2>Student Page</h2>
            <Logout />
            <div className='login-root'>
                <img src={require('./calender.jpg')} alt='cool image coming soon!!!! ;)' width="300" height="250" ></img>
                
            </div>
            {countries?.map((number) =>
            <div className="Dropdown">

                <DropdownButton title="Degree" >
                    <Dropdown.Item >{number.Degree}</Dropdown.Item>
                </DropdownButton >
                <DropdownButton title="Degree_Program" >
                    <Dropdown.Item>{number.Degree_Program}</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title="Semester" >
                    <Dropdown.Item>{number.Semester}</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title="Module_Name" >
                    <Dropdown.Item>{number.Module_name}</Dropdown.Item>
                </DropdownButton>
    
            </div>)} 
            <p className='p1'>Slots available</p>
            <button>Continue</button>
            
        </div>
    ) 
}

export default StuPage;