import {
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  differenceInCalendarDays,
  addWeeks
} from 'date-fns';

export const getDaysForCalendar = (currentMonth)=>{
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  let endDate = endOfWeek(monthEnd);

  let daysDifference = differenceInCalendarDays(endDate, startDate);

  if (daysDifference !== 41) {
    endDate = addWeeks(endDate, 1); // Adds one more week to the endDate
  }
  let days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  return days;
}
export const eventOptions = {
  1 : {
    background: "bg-light-orange",
    side: "bg-dark-blue",
    cameraBg: "bg-light-blue",
    camera: "white",
    title: "text-dark-blue",
    text: "text-light-blue"
  },
  2 : {
    background: "bg-dark-orange",
    side: "bg-light-blue",
    cameraBg: "bg-dark-blue",
    camera: "white",
    title: "text-dark-blue",
    text: "text-light-blue"
  },
  3 : {
    background: "bg-light-blue",
    side: "bg-light-orange",
    cameraBg: "bg-white",
    camera: "blue",
    title: "text-white",
    text: "text-white"
  }
}
export const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU","FRI","SAT"];