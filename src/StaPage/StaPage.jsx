import React, { useState, useEffect } from 'react'
import axios from "axios"
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Navbar from 'react-bootstrap/Navbar'
import './StaPage.css'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Logout from "../Logout/Logout"
import Accordion from 'react-bootstrap/esm/Accordion'
import AppToaster from '../StuPage/Toaster';
const StaPage = () => {

   
    // Reference for selecting range between dates was taken from React-Day-Picker: https://react-day-picker.js.org/examples/selected-range/
   
    const [slot, setSlot] = useState();
    const [data, setData] = useState([]);
    const[selectedslot,setSelectedSlot] = useState([])
    const[getslot, setGetSlot] = useState();
    const[open, setOpen] = useState();
    const[del,setDel] = useState();
    const [isLoading, setLoading] = useState(false);

    const [select_day,setSelectedDay] = useState({
        selectedDay: new Date(),
    });

    const handleDayClick = (day, { selected }) => {
    setSelectedDay({
      selectedDay: selected ? undefined : day,
    });

    }

    const handleSubmit =  async () => {
        //e.preventDefault();

        
        const newCourse = {
            
            Staff_Slot: data
        };
        console.log(newCourse)
       

        await axios.post("/api/add", newCourse, { headers: {"Content-Type" : "application/json"}})
        
            
        .then((res) => {
            //console.log('Dates & time ' + res + ' Added!');
            console.log(res)
        }).catch((err) => {
            console.log(err.res);
            //console.log("kaam karat naiye dukkar!! ")
    });
        
    }

    const handleTest = async () => {
        await axios.get("/api/findslot")
       
        .then((res) => {
            setGetSlot(res.data)
        }).catch((err) => {
            console.log(err.res);
            console.log("kaam karat naiye dukkar!! ")
        
    });
    if(getslot == false){
        AppToaster.show({ message: 'Nothing to display. Please select date & time slot', intent: 'danger' ,timeout: 5000});
    }
    else{
        
    }   
    }
    const handleDelete = async () => {
        await axios.delete("/api/slot/:id")
        .then((res) => {
            setDel(res.data)
        }).catch((err) => {
            console.log(err.res);
            console.log("kaam karat naiye dukkar!! ")
    });   
    }
    
    

    //console.log(data)
    //console.log(getslot)
    console.log(open)
    
    useEffect(() => {
        const slotData = async () => {
            await axios.get("/api/slots")
                .then(res => {
                    setSlot(res.data);
                    //console.log(res.data) 
                });
        };
        slotData();
        
    }, []);

    const addMoreItem = () => {
        setData( [...data, {
          day_date: select_day.selectedDay.toLocaleDateString(),
          slot_time: selectedslot
        }]);
        
        
        //AppToaster.show({ message: "", intent: 'success' ,timeout: 4000});
    }
   
    
    //console.log((sel_slot.toString().slice(0, 5)))
     
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
            

            <div>
                <Alert className="alert_staffpage" variant="warning">
                    Note: Please follow any sequence for information selection. Thanks!
                </Alert>
            </div>
            <div className="calendar">
                <DayPicker
                    selectedDays={select_day.selectedDay}
                    onDayClick={handleDayClick}
                    disabledDays={ { before: select_day.selectedDay, daysOfWeek: [0, 6]  }}
                />
                {<p>
                    Date: {select_day.selectedDay
                    ? select_day.selectedDay.toLocaleDateString()
                    : 'Please select a day '}
                </p> }
                
   
            </div>

            <div>
            {selectedslot?.map((todo) =>
                <p>Selected time slot: {todo}</p>)}

            </div>
            <p className="para">Select time slot from below:</p>
            <div className="Dropdown">
                
                <Accordion>
                {slot?.map((todo1,number) =>
                    <Accordion.Toggle onClick={e =>  setSelectedSlot( [...selectedslot, todo1.Slot])} as={Button} variant="link" eventKey={number.Slot} >
                        {todo1.Slot}
                    </Accordion.Toggle> )}
                </Accordion>
            </div>    

            

            {<div className='button_update'>
                <Button variant="primary" onClick={addMoreItem} className="link">
                Update date and time
                </Button>
            </div>}

            {<div className='button_save'>
                <Button variant="success" onClick={handleSubmit} className="link">
                    Confirm availability
                </Button>
            </div>}
            {<div className='button_test'>
                <Button variant="info" onClick={handleTest} className="link">
                    View released date and time slots
                </Button>
                </div>}

            

            {getslot?.map((item, index) => (
            <div key={index} className='list'>
                {item.Staff_Slot?.map((c, i) => (
                <ListGroup  key={i}>
                    <ListGroup.Item horizontal='md' onClick={e=> setOpen(c.day_date)} >Date: {c.day_date} Time slot: {" "+ c.slot_time + " "}<Button variant='danger' className='list_button' onClick={handleDelete}>Delete</Button></ListGroup.Item>
                </ListGroup>))}
            </div>))}
        </div>
    ) 
}

export default StaPage;
// Initial logic for displaying date and time slots fetched from database!!
{/*getslot?.map((item, index) => (
            <div key={index}>
                {item.Staff_Slot.map((c, i) => (
                <div key={i}>
                    <h6>Date released for feedback sessions:{c.day_date}</h6>
                </div>
                ))}
                 {item.Staff_Slot?.map((c, i) => (
                <div key={i}>
                    <h6>Time slot released for above dates: {c.slot_time}</h6>
                </div>
                ))}
            </div>
                 ))*/}