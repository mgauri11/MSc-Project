import React, { useState, useEffect } from 'react'
import axios from "axios"
import Accordion from 'react-bootstrap/Accordion'
import './StuPage.css'
import ListGroup from 'react-bootstrap/ListGroup'
import { Dialog } from '@blueprintjs/core'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Logout from "../Logout/Logout"
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import {TextArea, FormGroup}  from '@blueprintjs/core'
import DropdownItem from 'react-bootstrap/DropdownItem'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import * as Msal from 'msal';
import { msalConfig} from '../config';
import AppToaster from './Toaster';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'

const StuPage = () => {
  

// Reference for writing and accessing all Microsoft methods/functions in this file is taken from https://github.com/microsoftgraph/msgraph-training-reactspa/tree/main/demo/graph-tutorial.
//The tutorial is in TypeScript, I have converted the code into JavaScript syntax.

    
    const [data, setData] = useState([]);
    const [select, setSelect] = useState("");
    const [val, setVal] = useState();
    const [staff, setStaff] = useState();
    const[open, setOpen] = useState([]);
    const[sel_slot, setSel_slot] = useState([]);
    const [toggle, setToggle] = useState();
    const [show, setShow] = useState(false);
    const[eve, setEve] = useState([]);

// React state storing fetched module related info
    const [countries, setCountries] = useState();
//This useEffect is for fetching module info.
    useEffect(() => {
        const fecthData = async () => {
            await axios.get("/todos/todos")
                .then(res => {
                    setCountries(res.data);
                   
                });
        };
        fecthData();
        
    }, []);

//React state storing fetched year
   const [value, setValue] = useState();
//This useEffect is for fetching years from database.
    useEffect(() => {
        const yearData = async () => {
            await axios.get("/api/years")
                .then(res => {
                    setValue(res.data);
                   
                });
        };
        yearData();
        
    }, []);

//  React state storing fetched staff availability.  
    const [data1, setData1] = useState();
//This usEffect is for fetching staff availability.
    useEffect(() => {
        const slotData = async () => {
            await axios.get("/api/findslot")
                .then(res => {
                    setData1(res.data);
                   
                });
        };
        slotData();
        
    }, []); 
    
//Function handling styling/highlighting dates in Calendar. 
//Reference taken from: https://react-day-picker.js.org/docs/matching-days
    const birthdayStyle = `.DayPicker-Day--highlighted {
        background-color: blue;
        color: white;
      }`;
      const modifiers = {
        highlighted: new Date(open),
      };
      
    
     
//Logic for formatting start & end dateTime which will go into 
//Calendar API Create Event POST Request.
    var dateTime = (open + " " + sel_slot)
    console.log(String(dateTime))
    var important= moment.utc(dateTime).local().format('M/D/YY h:mm A');
    var returned_endate = moment(important).add(30, 'minutes');

   
//Microsoft function for accessing UserAgentApplication.
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
    
//Function handling POST request from Create Event Calendar API method.
    const handlePostRequest = async () => {
        
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
//Function for notifying if silent token request is failed.
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

//Logic from GraphService file copied here for flow of information.
    function getAuthenticatedClient(accessToken) {
        // Initialize Graph client
        const client = graph.Client.init({
          authProvider: (done) => {
            done(null, accessToken);
          }
        });
      
        return client;
    }
    
//Function handling request body for Create Event method.
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
            address: staff
            } 
        }
        ],
        allowNewTimeProposals: true,
        isOnlineMeeting: true,
        onlineMeetingProvider: "teamsForBusiness"
    };
    
// Calling the Calendar API via POST request.
    let res = await client.api('/me/events')
        .post(event);
        setEve(...eve,{event: res,Module: val})
        AppToaster.show({ message: 'Booking Confirmed,click on save to proceed', intent: 'success' ,timeout: 5000});
         
    }

//Function handling POST request for saving event info into 
//database => for displaying confirmed bookings in a list on 
//staff page. 
    const handleEvent =  async () => {

        const newCourse = {
            
            Event_info: eve
        };
       
        await axios.post("/api/add/event", newCourse, { headers: {"Content-Type" : "application/json"}})
           
        .then((res) => {
            AppToaster.show({ message: 'Booking received. You can continue with next booking.', intent: 'success' ,timeout: 5000});
            console.log(res)
        }).catch((err) => {
            console.log(err.res);
    });
        
    }


//functions to handle closing of dialog before confirming with booking!
    const close = () => {
        setToggle(false)
    }

//functions to handle opening of dialog before confirming with booking!
     const open_dialog = () => {
        setToggle(true)
    }

//function to refresh page if booking is cancelled!
    const refreshPage = () => {
        window.location.reload();
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
           
            <div className="modal_stu">
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
                        Steps to follow for booking feedback sessions
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        1) Select date and time slot from list given below Calendar.<br /> 
                        <br />
                        2) Select module related information and staff from the dropdown buttons in the middle.<br /> 
                        <br />
                        3) Write questions for staff which you would like to discuss with the staff member in feedback sessions.<br /> 
                        <br />
                        4) Click on Book button. In pop-up window click on confirm booking followed by clicking on save booking.<br /> 
                        <br />
                        Please feel free to ask clarification on any steps if they appear unclear. I'm more than happy to explain every step in more detail. <br /> 
                
                    </Modal.Body>
                </Modal>
            </div>
            <div>
                <Alert className="alert_page" variant="warning">
                    Note: Please follow any sequence for information selection.For step-wise guide, please click on user manual button. Thanks!
                </Alert>
            </div>
            <div className="calendar">
                <style>{birthdayStyle}</style>
                <DayPicker
                    modifiers={modifiers}
                    disabledDays={ { daysOfWeek: [0, 6] }}
                />
                {<p>
                    Select available date and time slot released by staff from below:
                   
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
            <div className='module_info'>
                <p>Selected Module: {val}</p>
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
            <Dialog isOpen={toggle} onClose={close} className="large" lazy usePortal>
                <div className="bp3-dialog-header" data-testid='video-preview'>
                    <h4 className="bp3-heading">Confirm booking details</h4>
                    <button aria-label="Close" className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross bp3-intent-danger" onClick={close}></button>

                </div>
                <div className="body_dialog" class="bp3-dialog-body">
                    Selected booking details: Date: {open}, time: {sel_slot} and staff: {staff}. Click on confirm and save for successful booking.
                </div>
                <div class="bp3-dialog-footer">
                    <div class="bp3-dialog-footer-actions">
                        
                        <button  onClick={handlePostRequest} class="bp3-button bp3-intent-success"  >Confirm booking</button>
                        <button type="submit"   onClick={handleEvent} class="bp3-button bp3-intent-primary">Save booking</button>
                        <button type="button" class="bp3-button bp3-intent-danger" onClick={refreshPage}>Cancel</button>
                    </div>
                </div>
            </Dialog>
            <Button  className="button_2" variant="danger" onClick={open_dialog}>Book</Button>
            
        </div>
    ) 
}

export default StuPage;