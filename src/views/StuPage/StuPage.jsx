import React, { useState, useEffect } from 'react'
import axios from "axios"
//import Header from './Header/Header'
import './StuPage.css'
import DropdownButton from 'react-bootstrap/DropdownButton'

export const StuPage = () => {

    const [countries, setCountries] = useState([]);

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
            <div className='login-root'>
                <img src={require('./calender.jpg')} alt='cool image coming soon!!!! ;)' width="300" height="250" ></img>
                
            </div>
            {countries?.map((number) =>
            <div>

                <h6>{number.Degree}</h6>
                <h6>{number.Degree_Program}</h6>
                <h6>{number.Semester}</h6>
                <h6>{number.Module_name}</h6>
    
            </div>)} 
            <p className='p1'>Slots available</p>
            <button>Continue</button>
            
        </div>
    ) 
}

