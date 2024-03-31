'use client';
import React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from './Modal';
import c from './Calendar.module.css';



export default function Calendar() {
  const [eventDetails, setEventDetails] = useState({ title: 'test' });
  const [formData, setFormData] = useState({
    start: '', 
    end: '', 
    title: '', 
    description:'',
    });
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState();
  const calendarApiRef = useRef();

  // when you click you recieve a object that contains view, date...
  function handleDateClick(arg) {
    // console.log(arg)
    setEventDetails({ title: 'test' });
    const calendarApi = arg.view.calendar;
    // create new event
    const newEvent = {
      title: 'test',
      description: 'todo xxxxx',
      start: arg.dateStr,
      end: '2024-03-30',
    };
    setEventDetails(newEvent);
    const result = calendarApi.addEvent(newEvent);
    // console.log(result);
  }

  function handleFormSubmit (formData){
    // console.log(formData)
    // setFormData(formData)
    setShowModal(false)
    addEvent(formData)
  }

  function addEvent(data) {
    
    setEvents({...events, data})
    // console.log(data)
    const calendarApi = calendarApiRef.current.calendar;
    calendarApi.addEvent(data)
  }

  function renderEventContent(eventInfo) {
    console.log(eventInfo)
    
    return (
      <>
        <b>{eventInfo.title}</b>
        <p>{eventInfo.start}</p>
        <p>{eventInfo.end}</p>
        <p>{eventInfo.description}</p>
      </>
    );
  }
  
  // // button to show the modal when clicked
  function add(){
      // alert('clicked the custom button!');
      setShowModal(true)
  }

  return (
    <>
    <div className={c.container}>
      <div className={c.contentContainer}>
       <FullCalendar
          ref={calendarApiRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          weekends={true}
          headerToolbar={{
            start: 'add prev,next',
            center: 'title',
            end: 'prevYear nextYear',
          }}
          customButtons={{
            add: {
              text: 'Add',
              click: add,
            },
          }}
          selectable
          dateClick={handleDateClick}
          displayEventTime={true}
          eventContent={() => renderEventContent(eventDetails)}
          events={events}
          
        />

      </div>
    </div>
    {showModal && (
      <Modal formData={formData} setFormData={setFormData} onSubmit={handleFormSubmit} />
    )}
    </>
  );
}
