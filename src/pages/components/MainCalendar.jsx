import React, { useState } from 'react';
import { format, 
  addMonths, 
  subMonths, 
  isSameMonth, 
  isSameDay,
  parseISO,
} from 'date-fns';
import { DownIcon, LeftIcon, RightIcon } from '../../components/Icons';
import {eventOptions, getDaysForCalendar, daysOfWeek} from '../../utils/helpers.jsx'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const EventTile = ({ title, option }) => {
  return (
    <div className={classNames('relative flex p-1 w-full rounded-sm',eventOptions[option].background)}>
      <div className={classNames('absolute top-0 left-0 h-full rounded-l-lg w-1',eventOptions[option].side)}></div>
      <h3 className={classNames('pl-1 font-semibold truncate',eventOptions[option].text)}>{title}</h3>
    </div>
  );
};



function MainCalendar({data}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = getDaysForCalendar(currentMonth)
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  console.log(isSameDay(new Date(2024, 5, 15), parseISO(data[0].startTime)),data[0].startTime)

  return (
    <div className="hidden md:block bg-white mt-2 h-fit" style={{width:"40rem"}}>
      <div className="flex justify-between items-center p-4  mb-4">
        <div className='flex items-center'>
          <button onClick={() => setCurrentMonth(new Date())} className='px-4 py-2 bg-white rounded-xl text-xs text-light-blue border border-light-blue'>Today</button>
          <div className="flex items-center">
            <button onClick={prevMonth} className="text-light-blue font-bold">
            <LeftIcon/>
          </button>
            <button onClick={nextMonth} className="text-light-blue font-bold">
            <RightIcon/>
          </button>
          <span className="text-dark-blue font-bold">{format(currentMonth, 'MMMM yyyy')}</span>
          </div>
        </div>
        <button className='flex items-center px-4 py-2 text-white rounded-xl text-xs bg-light-blue'>
          <span className='pr-1'>Month</span>
          <DownIcon/>
        </button>
      </div>
      <div className="grid grid-cols-7">
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
                  className={`flex flex-col justify-start items-center pt-3 border border-grey-400 text-xs aspect-square`}
                >
                  <div className={`px-1 rounded-full ${!isSameMonth(day,currentMonth)
                    ? "text-gray-400"
                    : isSameDay(day, new Date())
                    ? "bg-light-blue text-white"
                    : ""
                  }`}>
                    {formattedDate}
                  </div>
                  {
                  data && data.filter(event => isSameDay(day, parseISO(event.startTime))).slice(0,2)
                  .map((event, index) => (
                    <EventTile
                      key={index}
                      title={event.title}
                      option={event.option}
                    />
                  ))
                  }
                  {
                  data && data.filter(event => isSameDay(day, parseISO(event.startTime))).lenght>2
                  }
                </div>
                )
            })
          }
      </div>
    </div>
  );
}

export default MainCalendar;