import React from "react";
import SideBar from "./components/SideBar";
import MainCalendar from "./components/MainCalendar";
import data from '../data.json';

function Home() {

  return ( <div className="flex flex-row justify-center h-full gap-2">
    <SideBar data={data}/>
    <MainCalendar data={data}/>
  </div> );
}

export default Home;