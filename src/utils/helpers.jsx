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
export const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU","FRI","SAT"];