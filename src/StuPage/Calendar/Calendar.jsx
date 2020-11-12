import React, { useState } from "react";
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parse, subMonths, addMonths, getDate } from "date-fns";
import "./Calendar.css";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

/*
***
Reference:https://medium.com/@w.difulvio523/create-a-custom-hooks-calendar-in-react-e50bbba456e1
I have taken reference from above link/tutorial and tweaked logic according to my system requirement.

*/
const Calendar = () => {
    const [select_day,setSelectedDay] = useState({
        selectedDay: new Date(),
    });

    const handleDayClick = (day, { selected }) => {
    setSelectedDay({
      selectedDay: selected ? undefined : day,
    });
    console.log(select_day.selectedDay);
  }
   

return (
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
  );
};
export default Calendar;