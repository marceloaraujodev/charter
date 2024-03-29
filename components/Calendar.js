'use client';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import c from './Calendar.module.css';


export default function Calendar() {
  const [eventDetails, setEventDetails] = useState();


  // when you click you recieve a object that contains view, date...
  function handleDateClick(arg){ 
    const calendarApi = arg.view.calendar;
   // create new event
    const newEvent = {
      title: 'test',
      start: arg.dateStr,
      end: '2024-03-30'
    }
    calendarApi.addEvent(newEvent)
    setEventDetails(newEvent);
  }

  function handleEventAdd(info){
    console.log(info)
    info.event.setProp('content', renderEventContent(info.event))
  }
  
  function renderEventContent(eventInfo){
    // console.log(eventInfo)
    return (
      <>
      <b>{eventInfo.title}</b>
      <p>{eventInfo.start}</p>
      <p>{eventInfo.end}</p>
      </>
    )
  }


  return (
    
    <div className={c.container}>
      <div className={c.contentContainer}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // initialview={'dayGridMonth'}
          weekends={true}
          headerToolbar={{
            start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'prevYear nextYear', // will normally be on the right. if RTL, will be on the left
            }}
          selectable
          dateClick={handleDateClick}
          eventAdd={handleEventAdd}
          // eventContent={() => renderEventContent(eventDetails)}
        />
      </div>
    </div>
  );
}
