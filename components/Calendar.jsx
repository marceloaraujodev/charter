'use client';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Modal from './Modal';
import { v4 as uuidv4 } from 'uuid';
import c from './Calendar.module.css';



function formatDateToYMD(date) {
  return date.toISOString().split('T')[0];
}

// _def.extendedProps its where calendar holds the eventId 

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(false);
  const [formData, setFormData] = useState({
    eventId: '',
    start: '',
    end: '',
    title: '',
    description: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const calendarApiRef = useRef();

  useEffect(() => {
    if (selectedEvent){
      setIsEditing(true);
    }
    if(events.length > 0){

    }
  }, [selectedEvent])

  // form submission | event created
  function handleFormSubmit(formData) {
    // when submitting for the first time
    const eventId = uuidv4();
    const newEvent = {
      eventId,
      start: formData.start,
      end: formData.end,
      title: formData.title,
      description: formData.description,
    };
    setShowModal(false);
    setEvents([...events, newEvent]);
    // console.log(newEvent);
    axios.post('http://localhost:3000/api/calendar', newEvent)
  }

  // // button to show the modal when clicked
  function displayModal() {
    // test have to set it to empty string
    const eventId = uuidv4();
    const newEvent = {
      eventId,
      start: '',
      end: '',
      title: '',
      description: '',
    };
    
    setFormData(newEvent);
    // setFormData(formData);
    setEditEvent(false)
    setShowModal(true);
  }

  // when clicked opens modal and loads info from event
  async function eventClick(eventClickInfo) {
    setEditEvent(true);
    setShowModal(true);
    setSelectedEvent(eventClickInfo.event);
    // console.log(eventClickInfo.event)
    const clickedEvent = eventClickInfo.event;
    const title = clickedEvent.title;
    const description = clickedEvent.extendedProps?.description; 
    const startDate = formatDateToYMD(clickedEvent._instance.range.start); 
    const endDate = formatDateToYMD(clickedEvent._instance.range.end || clickedEvent._instance.range.start); 
    const eventId = clickedEvent.extendedProps?.eventId;

    setFormData({
      eventId,
      start: startDate,
      end: endDate,
      title,
      description
    })
  
    // console.log('Clicked Event Details:', { title, description, startDate, endDate, eventId });
  }

  // edit event is triggered when you save it.
  function editEventFunction() {
    const updatedEvents = events.map(event => {
      // console.log('selectedEvent:', selectedEvent._def.extendedProps?.eventId);
      // console.log('eventId:', event.eventId );
      if (event.eventId === selectedEvent._def.extendedProps?.eventId) {
        return {
          ...event,
          start: formData.start,
          end: formData.end,
          title: formData.title,
          description: formData.description,
        };
      }
      return event;
    });
    
    // console.log('event should be edited:', editedEvent )
    setEvents(updatedEvents);
    // setSelectedEvent(null);
    setIsEditing(false);
    setShowModal(false);
  }

  function closeModal() {
    setShowModal(false);
    setEditEvent(false);
    setIsEditing(false)
  }

  function deleteEvent(){
    // creates array that excludes the item
    const eventId = selectedEvent._def.extendedProps?.eventId;
    // const updatedEvents = events.filter(event => {
    //   return event.eventId !== eventId;
    // })
 
    // // update the state
    // setEvents(updatedEvents);
    axios.delete('http://localhost:3000/api/calendar', eventId)
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
                click: displayModal,
              },
            }}
            selectable
            displayEventTime={true}
            events={events}
            eventClick={eventClick}
            editable={true}
          />
        </div>
      </div>
      {showModal && (
        <Modal
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleFormSubmit}
          onCloseModal={closeModal}
          editEvent={editEvent}
          onEditSubmit={editEventFunction}
          onDelete={deleteEvent}
        />
      )}
    </>
  );
}

/* 
modal is open,
  sets the selected event to the event it was clicked using calender methods
  useEffect is used to monitor the selectedEvent variable
  sets isEditing to true
user edits content
  this need a state to know the user is editing so you can trigger a useEffect
user clicks edit button this is what triggers the function to call editEventFunction
submits data from the edit function
*/