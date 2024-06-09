import React, { useState } from 'react';
import { format, 
  addMonths, 
  subMonths, 
  isSameMonth, 
  isSameDay,
} from 'date-fns';
import { LeftIcon, RightIcon } from '../../components/Icons';
import {getDaysForCalendar, daysOfWeek} from '../../utils/helpers.jsx'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const EventTile = ({ title, time, description, icon, bgColor }) => {
  return (
    <div className={classNames('p-4 rounded-lg mb-4', bgColor)}>
      <div className="flex justify-between items-center">
        <h3 className="text-dark-blue font-semibold">{title}</h3>
        <div className="text-dark-blue">{icon}</div>
      </div>
      <p className="text-sm text-gray-600">{time}</p>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
      <a href="#" className="text-light-blue mt-2 inline-block">
        View Client Profile
      </a>
    </div>
  );
};


function MainCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = getDaysForCalendar(currentMonth)
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };



  return (
    <div className="hidden md:block p-4 bg-white mt-2" style={{width:"40rem", height:"40rem"}}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(new Date())} className="text-light-blue">Today</button>
        <div className="flex items-center">
          <button onClick={prevMonth} className="text-light-blue mx-2">&lt;</button>
          <span className="text-dark-blue font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
          <button onClick={nextMonth} className="text-light-blue mx-2">&gt;</button>
        </div>
        <button className="text-light-blue">Month</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {
          daysOfWeek.map((day, index)=>(
            <div key={index} className="text-gray-400 text-center text-xs">
              {daysOfWeek[index]}
            </div>
          ))
        }
        {
            days.map((day, i) => {
              const formattedDate = format(day, "d");
              return(
                <div
                  key={i}
                  className={`flex justify-center items-center text-xs aspect-square ${!isSameMonth(day,currentMonth)
                    ? "text-gray-400"
                    : isSameDay(day, new Date())
                    ? "bg-light-blue text-white rounded-full"
                    : ""
                  }`}
                >
                  <span>{formattedDate}</span>
                </div>
                )
            })
          }
      </div>
    </div>
  );
}

export default MainCalendar;