import React, { useState, useEffect } from 'react'
import axios from "axios"
import Accordion from 'react-bootstrap/esm/Accordion'
import './StuPage.css'
import ListGroup from 'react-bootstrap/ListGroup'
import { Dialog } from '@blueprintjs/core'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Logout from "../Logout/Logout"
import Button from 'react-bootstrap/esm/Button'
import Navbar from 'react-bootstrap/Navbar'
import {TextArea, FormGroup}  from '@blueprintjs/core'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import * as Msal from 'msal';
import { Event } from '@microsoft/microsoft-graph-client';
import { msalConfig} from '../config';
import { getEvents, getUserDetails } from '../GraphService';
import AppToaster from './Toaster';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'

const StuPage = () => {
  

    const [countries, setCountries] = useState();
    const [value, setValue] = useState();
    const [data, setData] = useState([]);
    const [select, setSelect] = useState("");
    const [data1, setData1] = useState();
    const [val, setVal] = useState();
    const [staff, setStaff] = useState();
    const[open, setOpen] = useState([]);
    const[sel_slot, setSel_slot] = useState([]);
    const [toggle, setToggle] = useState();
    const [show, setShow] = useState(false);
    const[eve, setEve] = useState([]);

  

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
   
    //REMOVE THIS USEEFFECT AND REPLACE WITH SINGLE VALUE DROPDOWN BUTTON
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
            await axios.get("/api/findslot")
                .then(res => {
                    setData1(res.data);
                   
                });
        };
        slotData();
        
    }, []); 
    
    //console.log(data1)
    // state handling dates from Calendar (React-day-picker).
    /*const [select_day,setSelectedDay] = useState({
        selectedDay: new Date(),
    });

    const handleDayClick = (day, { selected }) => {
    setSelectedDay({
      selectedDay: selected ? undefined : day,
    });

    }*/
    const birthdayStyle = `.DayPicker-Day--highlighted {
        background-color: blue;
        color: white;
      }`;
      const modifiers = {
        highlighted: new Date(open),
      };
      
    
     
    //Logic for start & end dateTime which will go into Calendar API POST Request
    var dateTime = (open + " " + sel_slot)
    console.log(String(dateTime))
    var important= moment.utc(dateTime).local().format('M/D/YY h:mm A');
    var returned_endate = moment(important).add(30, 'minutes');

   
    //Microsoft function for accessing UserAgentApplication
    var graph = require('@microsoft/microsoft-graph-client');
    const userAgentApplication = new Msal.UserAgentApplication({
        auth: {
            clientId: msalConfig.clientId,
            redirectUri: msalConfig.redirectUri
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: true
        }
    });

    const getAccessToken = async (scopes) => {
        try{
            var silentToken =  await  userAgentApplication.acquireTokenSilent({
                scopes: scopes  
            });
            return silentToken.accessToken;
        }
        catch (err) {
            // If a silent request fails, it may be because the user needs
            // to login or grant consent to one or more of the requested scopes
            if ( isInteractionRequired(err)) {
              var interactiveResult = await userAgentApplication.acquireTokenPopup({
                scopes: scopes
              });
    
              return interactiveResult.accessToken;
            } else {
              throw err;
            }
          }

    }
    
    const handlePostRequest = async () => {
        //refreshPage();
        AppToaster.show({ message: 'Booking received. You can continue with next booking.', intent: 'success' ,timeout: 5000});
        try {
            console.log(msalConfig.scopes);
            var accessToken = await getAccessToken(msalConfig.scopes);
            
            if (accessToken) {
            // Get the user's profile from Graph
            var  user =  await getEvents(accessToken);
            console.log("it's working!!!")
            
            }
        }
        catch(err) {
            console.log(err);
        }
        
    }
    const isInteractionRequired = (error) => {
        if (!error.message || error.message.length <= 0) {
          return false;
        }
  
        return (
          error.message.indexOf('consent_required') > -1 ||
          error.message.indexOf('interaction_required') > -1 ||
          error.message.indexOf('login_required') > -1
        );
    }

    function getAuthenticatedClient(accessToken) {
        // Initialize Graph client
        const client = graph.Client.init({
          authProvider: (done) => {
            done(null, accessToken);
          }
        });
      
        return client;
    }
    
    const getEvents = async (accessToken) => {
    const client = getAuthenticatedClient(accessToken);
    const event = {
        subject: "Feedback session- Testing",
        body: {
        contentType: "Text",
        content: select
        },
        start: {
            dateTime: dateTime,
            timeZone: "UTC"
        },
        end: {
            dateTime: returned_endate,
            timeZone: "UTC"
        },
        
        attendees: [
        {
            emailAddress: {
            address: staff,
            name: "Rochan"
            } 
        }
        ],
        allowNewTimeProposals: true,
        isOnlineMeeting: true,
        onlineMeetingProvider: "teamsForBusiness"
    };
    
    let res = await client.api('/me/events')
        .post(event);
        setEve(...eve,{event: event,Module: val})
        return event;  
        
        
        //refreshPage(); 
    }
    const handleEvent =  async () => {
        //e.preventDefault();

        
        const newCourse = {
            
            Event_info: eve
        };
        console.log(newCourse)
       

        await axios.post("/api/add/event", newCourse, { headers: {"Content-Type" : "application/json"}})
        
            
        .then((res) => {
            //console.log('Dates & time ' + res + ' Added!');
            console.log(res)
        }).catch((err) => {
            console.log(err.res);
            //console.log("kaam karat naiye dukkar!! ")
    });
        
    }

   

    // Sample POST request for storing all student selected infromation.
    /*const handleConfirm = () => {
        alert('Are you sure you want to continue booking ?')
        const student_info = [val, data, select_day.selectedDay.toLocaleDateString(),select];
        console.log(student_info)
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
    }*/

    //functions to handle opening and closing of dialog before confirming with booking!
    const close = () => {
        console.log("Close the Dialog!!");
        setToggle(false)
    }

     //functions to handle opening and closing of dialog before confirming with booking!
     const open_dialog = () => {
        console.log("Open the Dialog!!");
        setToggle(true)
    }

    //function to refresh page if booking is cancelled!
    const refreshPage = () => {
        console.log("Clicked");
        window.location.reload();
    }
    

    console.log((eve))
    /*const empty_availability = () => {
        if (data1 == null ) {
            setAlert(true)
            //AppToaster.show({ message: 'No dates and slots available for booking.Please check again in next week', intent: 'danger' ,timeout: 5000});
        }
        else{
            setAlert(false)
        }

    }*/
    
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
            <div>
                <Button onClick={handleEvent}>Save to database</Button>
            </div>
            <div className="modal_stu">
                <Button variant="info" onClick={() => setShow(true)}>
                    User-Manual
                </Button>
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Steps to follow for booking feedback sessions
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        1) You can start with selecting date and time slot from list given below Calendar. These dates and time slots are released from staff and sessions can be booked only for available date and time slot.<br /> 
                        <br />
                        2) After selecting date and time, the next step is to select module related information and staff from the dropdown buttons in the middle. You can view selected options below the dropdown buttons.<br /> 
                        <br />
                        3) The next step is to write questions for staff which you would like to discuss with the staff member.<br /> 
                        <br />
                        4) The next step is click on Book, you will be asked to confirm/cancel your booking highlighting the information you have selected like date, time and staff.Once clicked on confirm the session will be arranged and you can view it in your Outlook Calendar. If clicked on cancel button, you can start with entering new booking details or logout from the system.<br /> 
                        <br />
                        <br />

                        I hope above steps are helpful in using the application for student side and please feel free to ask clarification on any steps if they appear unclear. I'm more than happy to explain every step in more detail. <br /> 
                
                    </Modal.Body>
                </Modal>
            </div>
            <div>
                <Alert className="alert_page" variant="warning">
                    Note: Please follow any sequence for information selection. If you need more info please click on user-manual button. Thanks!
                </Alert>
            </div>
            <div className="calendar">
                <style>{birthdayStyle}</style>
                <DayPicker
                    modifiers={modifiers}
                    disabledDays={ { daysOfWeek: [0, 6] }}
                />
                {<p>
                    Select available date and time slot from below:
                   
                    </p>}
   
            </div>
 
            <div className="dropdown1">
                
                {value?.map((number,id) =>
                <DropdownButton title="Year">
                    <DropdownItem onSelect={e =>  setData( [...data, number.Year])} key={id}>
                        {number.Year}
                    </DropdownItem> 
                </DropdownButton> )} {' '}
               
                <DropdownButton  title="Course">
                {countries?.map((todo,id) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Course])} key={id}>
                        {todo.Course}
                    </DropdownItem>)}
                </DropdownButton>{' '}
                <DropdownButton title="Module">
                {countries?.map((todo,id) =>
                    <DropdownItem onSelect={e =>  setVal( todo.Module)} key={id}>
                        {todo.Module}
                    </DropdownItem>)} 
                </DropdownButton >{' '}
                <DropdownButton title="Staff">
                {countries?.map((todo,id) =>
                    <DropdownItem onClick={e =>  setStaff(todo.Module_Leader,e.target.value)} key={id}>
                        {todo.Module_Leader}
                    </DropdownItem>)} 
                </DropdownButton>{' '}
                
                <DropdownButton title="Semester">
                {countries?.map((todo,id) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Semester])} key={id}>
                        {todo.Semester}
                    </DropdownItem>)}
                </DropdownButton>{' '}
                
                 
            </div>
            
            <div  className='mod_info'>
            {data?.map((number,i) =>
                <p key={i}>Selected Module Info: {" " + number + " "}</p>)}
            </div> 
            <div className='staff_info'>
                <p>Selected Staff: {staff}</p>
            </div> 
             
            {data1?.map((item, index) => (
            <div key={index} className='list_911'>
                {item.Staff_Slot?.map((c, i) => (
                <ListGroup key={i} >
                    <ListGroup.Item horizontal='md' onClick={e=> setOpen(c.day_date)} >Date and Time: {c.day_date} <Accordion>
                {c.slot_time?.map((a,b) =>
                    <Accordion.Toggle key={b} onClick={e =>  setSel_slot(a, e.target.value)} as={Button} variant="link" >
                        { a + " "}
                    </Accordion.Toggle> )}
                    </Accordion>
                    </ListGroup.Item>
                </ListGroup>))}
                
                
                
            </div>))} 
            {/*  <div>
                {!data1 && !toggle && (<Alert className= "alert_slot" show={toggle} variant="warning">
                    No dates and slots available for booking
                </Alert>)}
            </div>*/}
            
            
            <div className='textarea'>
                <FormGroup
                label=' Please enter feedback related questions for staff below'
                labelFor='file-desc-input'
                
                >
                    <TextArea
                        growVertically={true}
                        fill={true}
                        large={true}
                        id='file-desc-input'
                        placeholder='Start here'
                        className='bp3-fill'
                        onChange={e =>  setSelect( e.target.value)}
                    
                    />
                </FormGroup>

            </div>
            {/*<Button className="button_2" variant="danger" onClick={handlePostRequest} >Book</Button>*/}
            <Dialog isOpen={toggle} onClose={close} className="large" lazy usePortal>
                <div className="bp3-dialog-header" data-testid='video-preview'>
                    <h4 className="bp3-heading">Confirm booking details</h4>
                    <button aria-label="Close" className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross" onClick={close}></button>

                </div>
                <div className="body_dialog" class="bp3-dialog-body">
                    Selected booking details: Date: {open}, time: {sel_slot} and staff: {staff}. You can cancel current details and continue with new booking by clicking on cancel.
                </div>
                <div class="bp3-dialog-footer">
                    <div class="bp3-dialog-footer-actions">
                        <button type="submit"  onClick={handlePostRequest} class="bp3-button bp3-intent-success">Confirm</button>
                        <button type="button" class="bp3-button bp3-intent-danger" onClick={refreshPage}>Cancel</button>
                    </div>
                </div>
            </Dialog>
            <Button  className="button_2" variant="danger" onClick={open_dialog}>Book</Button>
            
        </div>
    ) 
}

export default StuPage;