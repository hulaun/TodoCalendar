import React,{useState} from "react";
import SideBar from "./components/SideBar";
import MainCalendar from "./components/MainCalendar";

function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  

  return ( <div className="flex flex-row justify-center h-full gap-2">
    <SideBar/>
    <MainCalendar/>
  </div> );
}

export default Home;