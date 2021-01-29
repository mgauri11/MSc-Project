import React, { useState, useEffect } from 'react'
import axios from "axios"
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Navbar from 'react-bootstrap/Navbar'
import './StaPage.css'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Logout from "../Logout/Logout"
import { Dialog } from '@blueprintjs/core'
import Accordion from 'react-bootstrap/Accordion'
import AppToaster from '../StuPage/Toaster';

const StaPage = () => {

// Reference for selecting date was taken from React-Day-Picker: https://react-day-picker.js.org/
   
    const[selectedslot,setSelectedSlot] = useState([])
    const[open, setOpen] = useState();
    const [toggle, setToggle] = useState();
    const [tog, setTog] = useState();
    const [on, setOn] = useState(false);
    const [on_mod, setOn_Mod] = useState(false);
    const [show, setShow] = useState(false);

    //React state handling dates selected from Calendar.
    const [select_day,setSelectedDay] = useState({
        selectedDay: new Date(),
    });
    //function to update selected date from staff in react state.
    const handleDayClick = (day, { selected }) => {
    setSelectedDay({
      selectedDay: selected ? undefined : day,
    });

    }

    //function to save availability in database.
    const handleSubmit =  async () => {
        refreshPage_1();
        const newTime = {
            Staff_Slot: data
        };
        await axios.post("/api/add", newTime, { headers: {"Content-Type" : "application/json"}}) 
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err.res);
    });
        
    }
    //React state for storing released date and time slots.
    const[getslot, setGetSlot] = useState();
    //function to fetch released date and time slots by staff.
    const handleTest = async () => {
        await axios.get("/api/findslot")
        .then((res) => {
            setGetSlot(res.data)
        }).catch((err) => {
            console.log(err.res);  
    });
    if(getslot == false){
        AppToaster.show({ message: 'Nothing to display. Please select date & time slot', intent: 'danger' ,timeout: 5000});
    }
    else{
        
    }   
    }

    //React state storing selected date and time slot to perform delete.
    const[del,setDel] = useState();
    //function to delete the date and time slots from the
    // list of availability.
    const handleDelete = async () => {
        await axios.delete("/api/slot/:id")
        .then((res) => {
            setDel(res.data)
        }).catch((err) => {
            console.log(err.res);
    });   
    }
    
    // React state for storing fetched slots from backend & database.
    const [slot, setSlot] = useState();
    // UseEffect block fetching the time slots from baackend & database.
    useEffect(() => {
        const slotData = async () => {
            await axios.get("/api/slots")
                .then(res => {
                    setSlot(res.data); 
                });
        };
        slotData(); 
    }, []);
    
    //React state to store fetched bookings
    const [tab, setTab] = useState();
    // Logic for fetching stored confirmed bookings from students.
    useEffect(() => {
        const eventData = async () => {
            await axios.get("/api/findevent")
                .then(res => {
                    setTab(res.data);
                    console.log(res.data) 
                });
        };
        eventData(); 
    }, []);

    //React state to store selected date & time slots by staff.
    const [data, setData] = useState([]);
    // function to store date and time slots selected by 
    //staff for confirming their availability.
    const addMoreItem = () => {
        setData( [...data, {
          day_date: select_day.selectedDay.toLocaleDateString(),
          slot_time: selectedslot
        }]);
         
    }

    //functions to handle opening and closing of first dialog - confirm availability
    const close = () => {
        setToggle(false)
    }

     //functions to handle opening and closing of dialog - confirm availability
     const open_dialog = () => {
        setToggle(true)
    }

    //function to refresh page
    const refreshPage = () => {
        console.log("Clicked");
        window.location.reload();
    }
    
    //FUNCTIONS FOR SECONDS DIALOG FOR CONFIRMING DETAILS

     //functions to handle opening and closing for - save availability
     const close_1 = () => {
        setTog(false)
    }

     //functions to handle opening and closing for - save availability
     const open_dialog_1 = () => {
        setTog(true)
    }

    //function to refresh page if booking is confirmed!
    const refreshPage_1 = () => {
        window.location.reload();
    }
     
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
                    Note: Please follow any sequence for information selection.For step-wise guide please click on help button. Thanks!
                </Alert>
            </div>
            <div className="modal_sta">
                <Button variant="info" onClick={() => setShow(true)}>
                    Help
                </Button>
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Steps for releasing date and time for feedback sessions
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        1) Select date from Calendar and corresponding time slot for the selected date from time slot list in the center of page. There is no limit on adding available date and time.<br /> 
                        <br />
                        2) Click on confirm availability button for confirming availability.<br /> 
                        <br />
                        3) After clicking on confirm,click on cross button on top right of pop-up window to close the window.<br /> 
                        <br />
                        4) Click on save availability button for saving availability.<br /> 
                        <br />
                        5) By clicking on view released date and time button, list of past availability with delete button is visible.<br /> 
                        <br />
                        6) Confirmed bookings from students can be viewed by clicking on view confirmed booking button.
                        <br />
                        <br />

                        Please feel free to ask clarification on any steps if they appear unclear. Thanks! <br /> 
                
                    </Modal.Body>
                </Modal>
            </div>
            <div className="button_view" >
                <Button variant="outline-primary" onClick={() => setOn(true)}>
                    View confirmed bookings from students
                </Button>
                    <Modal
                        show={on}
                        onHide={() => setOn(false)}
                        size="lg"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        List of confirmed bookings.
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {tab?.map((item, index) => (
                    <div key={index} >
                        {item.Event_info?.map((c, i) => (
                        <ListGroup  key={i}>
                            <ListGroup.Item onClick={on} horizontal='md' >Module: {c.Module}, Student_email: {c.event.organizer.emailAddress.address}, Date and Time: {c.event.start.dateTime} </ListGroup.Item>
                        </ListGroup>))}
                    </div>))}
                    
                    </Modal.Body>
                </Modal>
            </div>
            <div  className='button_test' >
                <Button variant="outline-info"  onClick={() => setOn_Mod(true)}>
                    View released date and time
                </Button>
                
                
                    <Modal
                        show={on_mod}
                        onShow={handleTest}
                        onHide={() => setOn_Mod(false)}
                        size="lg"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Released date and time.
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    {getslot?.map((item, index) => (
                    <div key={index} className='list'>
                        {item.Staff_Slot?.map((c, i) => (
                        <ListGroup horizontal='xl'  key={i}>
                            <ListGroup.Item horizontal='xl' onClick={e=> setOpen(c.day_date)} >Date: {c.day_date} Time slot: {" "+ c.slot_time + " "}<Button variant='danger'size='sm' className='list_button' onClick={handleDelete}>Delete</Button></ListGroup.Item>
                        </ListGroup>))}
                    </div>))}
                   
                    
                    </Modal.Body>
                </Modal>
            </div>
            <div className="calendar">
                <DayPicker
                    selectedDays={select_day.selectedDay}
                    onDayClick={handleDayClick}
                    disabledDays={ {  daysOfWeek: [0, 6]  }}
                />
                {<p>
                    Date: {select_day.selectedDay
                    ? select_day.selectedDay.toLocaleDateString()
                    : 'Please select a day '}
                </p> }
                
   
            </div>

            <div>
            {selectedslot?.map((todo) =>
                <p>Selected time slot: {todo}                  </p> 
                )}

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

            
            <Dialog isOpen={toggle} onClose={close} className="large" lazy usePortal>
                <div className="bp3-dialog-header" data-testid='video-preview'>
                    <h4 className="bp3-heading">Confirm date and time</h4>
                    <button aria-label="Close" className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross bp3-intent-danger" onClick={close}></button>

                </div>
                <div className="body_dialog" class="bp3-dialog-body">
                    Selected details: Date: {select_day.selectedDay.toDateString()}, time: {" "+ selectedslot + " "}. Clicking on confirm button will confirm the date and time. Alternatively, clicking on cancel will not confirm selected information.
                </div>
                <div class="bp3-dialog-footer">
                    <div class="bp3-dialog-footer-actions">
                        <button type="submit"  onClick={addMoreItem} class="bp3-button bp3-intent-success">Confirm</button>
                        <button type="button" class="bp3-button bp3-intent-danger" onClick={refreshPage}>Cancel</button>
                    </div>
                </div>
            </Dialog>
            {<div className='button_update'>
                <Button variant="primary" onClick={open_dialog} className="link">
                    Confirm availability
                </Button>
            </div>}
            <Dialog isOpen={tog} onClose={close_1} className="large" lazy usePortal>
                <div className="bp3-dialog-header" data-testid='video-preview'>
                    <h4 className="bp3-heading">Release date and time</h4>
                    <button aria-label="Close" className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross bp3-intent-danger" onClick={close_1}></button>

                </div>
                <div className="body_dialog" class="bp3-dialog-body">
                   By clicking on save button confirmed date and time will be released for students to book the feedback sessions. By clicking on cancel button the saved info will be lost. 
                </div>
                <div class="bp3-dialog-footer">
                    <div class="bp3-dialog-footer-actions">
                        <button type="submit"  onClick={handleSubmit} class="bp3-button bp3-intent-success">Save</button>
                        <button type="button" class="bp3-button bp3-intent-danger" onClick={refreshPage_1}>Cancel</button>
                    </div>
                </div>
            </Dialog>
            {<div className='button_save'>
                <Button variant="success" onClick={open_dialog_1} className="link">
                    Save availability
                </Button>
            </div>}
              
        </div>
        
    ) 
}

export default StaPage;
