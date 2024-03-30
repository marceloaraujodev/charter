'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import c from './Calendar.module.css';



export default function Calendar() {
   const [eventDetails, setEventDetails] = useState({title: 'test'});

  //   useEffect(() => {
  //   console.log('test')
  //   console.log(eventDetails)
  // }, [])

  // when you click you recieve a object that contains view, date...
  function handleDateClick(arg){ 
    setEventDetails({title: 'test'})
    console.log('test')
    const calendarApi = arg.view.calendar;
   // create new event
    const newEvent = { 
      title: 'test',
      description: 'todo xxxxx',
      start: arg.dateStr,
      end: '2024-03-30'
    }
    const result = calendarApi.addEvent(newEvent)
    setEventDetails(newEvent)
    console.log(result)
    // setEventDetails(newEvent);
  }

  function handleEventAdd(event){
    console.log(event)
    // console.log(info)
    // info.event.setProp('content', renderEventContent(info.event))
  }
  
  function renderEventContent(eventInfo){
    // console.log(eventInfo)
    return (
      <>
      <b>{eventInfo.title}</b>
      <p>{eventInfo.start}</p>
      <p>{eventInfo.description}</p>
      </>
    )
  }


  return (
    
    <div className={c.container}>
      <div className={c.contentContainer}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialview={'dayGridMonth'}
          weekends={true}
          headerToolbar={{
            start: 'today prev,next', 
            center: 'title',
            end: 'prevYear nextYear', 
            }}
          selectable
          dateClick={handleDateClick}
          eventAdd={handleEventAdd}
          displayEventTime={true}
          eventContent={() => renderEventContent(eventDetails)}
        />
      </div>
    </div>

  );
}
