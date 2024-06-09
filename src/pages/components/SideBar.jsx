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

const EventCard = ({ title, time, description, icon, bgColor }) => {
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


function SideBar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = getDaysForCalendar(currentMonth)

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };


  

  return (
    <div className="flex flex-col bg-white rounded-sm mt-2 w-96 h-full">
      <section className='p-4 border border-gray-300'>
        <div className="flex justify-center gap-2 items-center mb-4">
          <button onClick={prevMonth} className="text-light-blue font-bold">
            <LeftIcon/>
          </button>
          <span className="mx-2 text-dark-blue text-center font-bold w-20">{format(currentMonth, 'MMM yyyy')}</span>
          <button onClick={nextMonth} className="text-light-blue font-bold">
            <RightIcon/>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 px-3">
          {
            daysOfWeek.map((day, index)=>(
              <div key={index} className="text-gray-400 text-center text-xs">
                {day}
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
      </section>
      <div className="border border-gray-300 px-4 py-6">
        <div className='flex justify-between items-center'>
          <h2 className="text-dark-blue text-xl font-bold">Upcoming Events</h2>
          <button className='px-4 py-2 bg-dark-blue text-white rounded-full text-xs'>View All</button>
        </div>
        <p className="text-gray-400 font-semibold pb-2">Today, 4 Apr</p>
        <EventCard
          title="First Session with Alex Stan"
          time="9:00 AM - 09:30 AM GMT+8"
          description="Zoom Meeting"
          icon={<i className="fas fa-video"></i>} // Replace with actual icon
          bgColor="bg-light-orange"
        />
        <EventCard
          title="Webinar: How to cope with trauma in professional life"
          time="9:00 AM - 09:30 AM GMT+8"
          description="Zoom Meeting"
          icon={<i className="fas fa-video"></i>} // Replace with actual icon
          bgColor="bg-dark-orange"
        />
        <EventCard
          title="First Session with Alex Stan"
          time="9:00 AM - 09:30 AM GMT+8"
          description="Zoom Meeting"
          icon={<i className="fas fa-video"></i>} // Replace with actual icon
          bgColor="bg-dark-blue text-white"
        />
      </div>
    </div>
  );
}

export default SideBar;