import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/esm/Accordion'
import './Slot.css'
import axios from "axios"
import Button from 'react-bootstrap/esm/Button'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import StuPage from '../StuPage'

const Slot = () => {
  
    const [data, setData] = useState();
    const [val, setVal] = useState();
    /* 
    const handleDayClick = (day, { selected }) => {
    setSelectedDay({
      selectedDay: selected ? undefined : day,
    });
    console.log(select_day.selectedDay);
  }
   

    */
    
    useEffect(() => {
        const fecthData = async () => {
            await axios.get("/api/slots")
                .then(res => {
                    setData(res.data);
                    console.log(res.data)
                   
                });
        };
        fecthData();
        
    }, []); 
   
    
    return (
        <div >
            
           
            <div className="p1">
                <Accordion>
                {data1?.map((todo1) =>
                    <Accordion.Toggle onClick={e =>  setVal(todo1.Slot, e.target.value)} as={Button} variant="link" eventKey="0" >
                        {todo1.Slot}
                    </Accordion.Toggle> )}
                </Accordion>
            </div>
            
                
        </div>
    ) 
}

export default Slot;