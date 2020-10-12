import React, { useState, useEffect } from 'react'
import axios from "axios"
import Header from './Header/Header'
import './StuPage.css'

const StuPage = () => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            await axios.get("http://localhost:5000/api/auth/info")
                .then(res => {
                    setCountries(res.data);
                    console.log(countries);
                });
        };
        fecthData();
    }, []);
    

    return (
        <div  className='title'>
            <Header />
            <div className='login-root'>
                <img src={require('./calender.jpg')} alt='cool image coming soon!!!! ;)' width="300" height="250" ></img>
                
            </div>
            <p className='p1'>Slots available</p>
            
        </div>
    ) 
}

export default StuPage;