import React, { useState } from 'react';
import { format, 
  addMonths, 
  subMonths, 
  isSameMonth, 
  isSameDay,
  isAfter,
  parseISO,
} from 'date-fns';
import { CameraIcon, LeftIcon, RightIcon } from '../../components/Icons';
import {eventOptions, getDaysForCalendar, daysOfWeek} from '../../utils/helpers.jsx'


const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const EventCard = ({ title, startTime, endTime,clientImg, type="Event", option }) => {

  const time1 = format(startTime,'K:mm a')
  const time2 = format(endTime,'K:mm a O')
  return (
    <div className={classNames('relative flex justify-between p-4 rounded-lg mb-4',eventOptions[option].background)}>
      <div className={classNames('absolute top-0 left-0 h-full rounded-l-lg w-1',eventOptions[option].side)}></div>
      <div className='basis-3/4'>
        <h3 className={classNames('font-semibold line-clamp-2',eventOptions[option].title)}>{`${title}`}</h3>
        <p className={classNames("text-sm",eventOptions[option].text)}>{`${time1} - ${time2}`}</p>
        {(type==="Appointment")
        ?
          <div className='flex pt-1 justify-start items-center'>
            <img src={clientImg} className='rounded-full w-8 h-8 mr-2'/>
            <a href="#" className={classNames("inline-block",eventOptions[option].text)}>
              View Client Profile
            </a>
          </div>
        :""}
      </div>
      {(type==="Appointment")
      ?
      <div className={classNames("flex justify-center items-center rounded-full h-8 w-8",eventOptions[option].cameraBg)}>
        <CameraIcon color={eventOptions[option].camera}/>
      </div>
      :""}
    </div>
  );
};


function SideBar({events}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = getDaysForCalendar(currentMonth)
  const upcomingEvents = events && events
    .filter(event => isAfter(parseISO(event.startTime), currentMonth))
    .sort((a, b) => parseISO(a.startTime) - parseISO(b.startTime))
    .slice(0,3)

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };


  return (
    <div className="flex flex-col bg-white rounded-sm mt-2 w-96">
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
      <div className="border border-gray-300 px-4 py-6 grow">
        <div className='flex justify-between items-center'>
          <h2 className="text-dark-blue text-xl font-bold">Upcoming Events</h2>
          <button className='px-4 py-2 bg-dark-blue text-white rounded-full text-xs'>View All</button>
        </div>
        <p className="text-gray-400 font-semibold pb-2">Today, 4 Apr</p>
        {upcomingEvents && upcomingEvents.map((event, index)=>(
          <EventCard
            key={index}
            title={event.title}
            startTime={event.startTime}
            endTime={event.endTime}
            type={event.type}
            clientImg={event.clientImg}
            option={index%3+1}
          />))
        }
      </div>
    </div>
  );
}

export default SideBar;