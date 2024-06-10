import React from "react";
import SideBar from "./components/SideBar";
import MainCalendar from "./components/MainCalendar";
import response from '../data.json';

function Home() {
  var events=[];
  if(response.appCode!=="success"){
    console.error(response.appCode)
  }else{
    events = response.events
  }
  return ( <div className="flex flex-row justify-center h-screen gap-2">
    <SideBar events={events}/>
    <MainCalendar events={events}/>
  </div> );
}

export default Home;