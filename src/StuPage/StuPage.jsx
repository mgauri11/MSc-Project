import React, { useState, useEffect } from 'react'
import axios from "axios"
import Accordion from 'react-bootstrap/esm/Accordion'
import './StuPage.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Logout from "../Logout/Logout"
import Button from 'react-bootstrap/esm/Button'
import Navbar from 'react-bootstrap/Navbar'
import {TextArea, FormGroup}  from '@blueprintjs/core'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const StuPage = () => {
  

    const [countries, setCountries] = useState();
    const [value, setValue] = useState();
    const [data, setData] = useState([]);
    const [select, setSelect] = useState([]);
    const [data1, setData1] = useState();
    const [val, setVal] = useState();

  
    

    useEffect(() => {
        const fecthData = async () => {
            await axios.get("/todos/todos")
                .then(res => {
                    setCountries(res.data);
                    console.log(res.data)
                   
                });
        };
        fecthData();
        
    }, []);
   

    useEffect(() => {
        const yearData = async () => {
            await axios.get("/api/years")
                .then(res => {
                    setValue(res.data);
                   
                });
        };
        yearData();
        
    }, []);

    useEffect(() => {
        const slotData = async () => {
            await axios.get("/api/slots")
                .then(res => {
                    setData1(res.data);
                    //console.log(res.data)
                   
                });
        };
        slotData();
        
    }, []); 

  
    const [select_day,setSelectedDay] = useState({
        selectedDay: new Date(),
    });

    const handleDayClick = (day, { selected }) => {
    setSelectedDay({
      selectedDay: selected ? undefined : day,
    });

    }
    
    
    const handleConfirm = () => {
        alert('Are you sure you want to continue booking ?')
        const student_info = [val, data, select_day.selectedDay.toLocaleDateString(),select];
        //console.log(student_info)
        const stu_Data = async () => {
        await axios.post("/api/stu_info", student_info)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
        });
    };
    stu_Data();
    }
    


    
    return (
        <div className='login-root'>
            <div>
            <Navbar bg="light" expand="sm" >
                <Navbar.Brand href="#home">
                    <img
                        src={require('../Home/logo.jpg')} 
                        width="80"
                        height="80"
                        className="d-inline-block align-top"
                        alt=""
                    />{' '}
                    
                </Navbar.Brand>
                <Navbar className='Heading'>Student-Page</Navbar>
            </Navbar>
            </div>

            <div className="b1">
               <Logout />
            </div>
            <div className="calendar">
                <DayPicker
                    selectedDays={select_day.selectedDay}
                    onDayClick={handleDayClick}
                />
                {/*<p>
                    Selected Date: {select_day.selectedDay
                    ? select_day.selectedDay.toLocaleDateString()
                    : 'Please select a day 👻'}
                    </p>*/}
   
            </div>
 
            <div className="dropdown1">
                <DropdownButton title="Year">
                {value?.map((number) =>
                    <DropdownItem onSelect={e =>  setData( [...data, number.Year])} key={number.id}>
                        {number.Year}
                    </DropdownItem> )}
                </DropdownButton> 
               
                <DropdownButton  title="Course">
                {countries?.map((todo) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Course])} key={todo.id}>
                        {todo.Course}
                    </DropdownItem>)}
                </DropdownButton>
                <DropdownButton title="Module">
                {countries?.map((todo) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Module.Module_code])} key={todo.id}>
                        {todo.Module.Module_code}
                    </DropdownItem>)}
                </DropdownButton >
                <DropdownButton title="Staff">
                {countries?.map((todo) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Module.Module_Leader.name])} key={todo.id}>
                        {todo.Module.Module_Leader.name}
                    </DropdownItem>)}
                </DropdownButton>
                <DropdownButton title="Semester">
                {countries?.map((todo) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Semester])} key={todo.id}>
                        {todo.Semester}
                    </DropdownItem>)}
                </DropdownButton>
                   
                    
            </div>
            <div className="p1">
        
                <Accordion>
                {data1?.map((todo1,number) =>
                    <Accordion.Toggle onClick={e =>  setVal(todo1.Slot, e.target.value)} as={Button} variant="link" eventKey={number.Slot} >
                        {todo1.Slot}
                    </Accordion.Toggle> )}
                </Accordion>
            </div>    
            <div className='textarea'>
                <FormGroup
                label=' Enter Feedback Questions Below'
                labelFor='file-desc-input'
                
                >
                    <TextArea
                        growVertically={true}
                        fill={true}
                        large={true}
                        id='file-desc-input'
                        placeholder='Write questions'
                        className='bp3-fill'
                        onChange={e =>  setSelect( e.target.value)}
                    
                    />
                </FormGroup>

            </div>
            <Button className="button_2" size="sm" variant="danger" onClick={handleConfirm}>Book</Button>
            
        </div>
    ) 
}

export default StuPage;