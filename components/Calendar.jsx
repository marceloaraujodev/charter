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
    time: '',
    title: '',
    description: '',
    public: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const calendarApiRef = useRef();

  useEffect(() => {
    if (selectedEvent){
      // setIsEditing(true);
    }
    if(events.length > 0){

    }
    loadTasks()
  }, [selectedEvent])

  async function loadTasks(){
    try {
     const res = await axios.get('http://localhost:3000/api/calendar');
    //  console.log(res.data.tasks);
     const currentTasks = res.data.tasks;
     setEvents(currentTasks)
      
    } catch (error) {
      console.log(error);
    }
  }

  // form submission | event created
  function handleFormSubmit(formData) {
    // when submitting for the first time
    const eventId = uuidv4();

    const newEvent = {
      eventId,
      start: formData.time ? formData.start + ' ' + formData.time : formData.start,
      end: formData.end,
      time: formData.time,
      title: formData.title,
      description: formData.description,
      public: formData.public, 
    };
    setShowModal(false);
    setEvents([...events, newEvent]);
    console.log(newEvent);
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
      time: '',
      title: '',
      description: '',
      public: false,
    };
    
    setFormData(newEvent);
    // setFormData(formData);
    setEditEvent(false)
    setShowModal(true);
    setIsEditing(true)
  }

  // when clicked opens modal and loads info from event
  async function eventClick(eventClickInfo) {
    // setEditEvent(true);
    setShowModal(true);
    setSelectedEvent(eventClickInfo.event);
    console.log(eventClickInfo.event)
    const clickedEvent = eventClickInfo.event;
    const title = clickedEvent.title;
    const description = clickedEvent.extendedProps?.description; 
    const startDate = formatDateToYMD(clickedEvent._instance.range.start); 
    const endDate = formatDateToYMD(clickedEvent._instance.range.end || clickedEvent._instance.range.start); 
    const eventId = clickedEvent.extendedProps?.eventId;
    const time = clickedEvent.extendedProps?.time;
  

    setFormData({
      eventId,
      start: startDate,
      end: endDate,
      time,
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
          time: formData.time,
          title: formData.title,
          description: formData.description,
          public: formData.public,
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

  async function deleteEvent(){
    alert('Are you sure you want to delete this event?')
    try {
      const eventId = selectedEvent._def.extendedProps?.eventId;
      await axios.delete('http://localhost:3000/api/calendar', {
        headers: { 'eventId': eventId }, // Custom header for eventId
      });
      
      // creates array that excludes the item
      const updatedEvents = events.filter(event => {
        return event.eventId !== eventId;
      })
      // // update the state
      setEvents(updatedEvents);
      // even though url doesnt change in browser its still sent here below
      closeModal();
    } catch (error) {
      console.log(error);
    }
    
  }

  function openEditor(){
    setEditEvent(true)
    setIsEditing(true);
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
          isEditing={isEditing}
          onEdit={openEditor}
        />
      )}
    </>
  );
}

