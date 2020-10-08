import React from 'react'
import Header from './Header/Header'
import './StuPage.css'

const StuPage = () => {
    

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