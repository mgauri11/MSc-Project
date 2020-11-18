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
import moment from 'moment';
import * as Msal from 'msal';
import { Event } from '@microsoft/microsoft-graph-client';
import { msalConfig} from '../config';
import { getEvents, getUserDetails } from '../GraphService';
import AppToaster from './Toaster';

const StuPage = () => {
  

    const [countries, setCountries] = useState();
    const [value, setValue] = useState();
    const [data, setData] = useState([]);
    const [select, setSelect] = useState("");
    const [data1, setData1] = useState();
    const [val, setVal] = useState();
    const [staff, setStaff] = useState();

  

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
    //Logic for start & end dateTime which will go into Calendar API POST Request
    var dateTime = (select_day.selectedDay.toLocaleDateString()+ " " + val)
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
                // Acquire token silent success
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
            dateTime: important,
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
        return event;    
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
                {<p>
                    Selected Date: {select_day.selectedDay
                    ? select_day.selectedDay.toLocaleDateString()
                    : 'Please select a day 👻'}
                    </p>}
   
            </div>
 
            <div className="dropdown1">
                
                {value?.map((number,id) =>
                <DropdownButton title="Year">
                    <DropdownItem onSelect={e =>  setData( [...data, number.Year])} key={id}>
                        {number.Year}
                    </DropdownItem> 
                </DropdownButton> )}
               
                <DropdownButton  title="Course">
                {countries?.map((todo,id) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Course])} key={id}>
                        {todo.Course}
                    </DropdownItem>)}
                </DropdownButton>
                <DropdownButton title="Module">
                {countries?.map((todo,id) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Module])} key={id}>
                        {todo.Module}
                    </DropdownItem>)}
                </DropdownButton >
                <DropdownButton title="Staff">
                {countries?.map((todo,id) =>
                    <DropdownItem onClick={e =>  setStaff(todo.Module_Leader,e.target.value)} key={id}>
                        {todo.Module_Leader}
                    </DropdownItem>)}
                </DropdownButton>
                <DropdownButton title="Semester">
                {countries?.map((todo,id) =>
                    <DropdownItem onSelect={e =>  setData([...data, todo.Semester])} key={id}>
                        {todo.Semester}
                    </DropdownItem>)}
                </DropdownButton>
                 
            </div>
            {data?.map((number) =>
            <div className='mod_info'>
                <p >Selected Module Info: {number}</p>
            </div>)} 
            <div className='mod_info'>
                <p>Selected Staff: {staff}</p>
            </div>
            <div className="p1">
        
                <Accordion>
                {data1?.map((todo1,number) =>
                    <Accordion.Toggle onClick={e =>  setVal(todo1.Slot, e.target.value)} as={Button} variant="link" eventKey={number.Slot} >
                        {todo1.Slot}
                    </Accordion.Toggle> )}
                </Accordion>
                <p>Slot: {val}</p>
            </div>    
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
            <Button className="button_2" variant="danger" onClick={handlePostRequest} >Book</Button>
            
        </div>
    ) 
}

export default StuPage;