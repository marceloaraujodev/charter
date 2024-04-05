'use client';
import React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
import c from './Calendar.module.css';

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    start: '',
    end: '',
    title: '',
    description: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventsCount, setEventsCount] = useState(0);
  const calendarApiRef = useRef();

  useEffect(() => {
    if (selectedEvent){
      setIsEditing(true);
    }
    if(events.length > 0){

    }
  }, [selectedEvent])


  function handleFormSubmit(formData) {
    // when submitting for the first time
    const eventId = uuidv4();
    const newEvent = {
      id: eventId,
      start: formData.start,
      end: formData.end,
      title: formData.title,
      description: formData.description,
    };
    setShowModal(false);
    setEvents([...events, newEvent]);
  }

  // // button to show the modal when clicked
  function displayModal() {
    // test have to set it to empty string
    const eventId = uuidv4();
    const newEvent = {
      id: eventId,
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

  // event click opens modal and selectedEvent to the clicked event and calls the editEventFunction when setEditEvent is true
  function eventClick(eventClickInfo) {
    setEditEvent(true);
    setShowModal(true);
    setSelectedEvent(eventClickInfo.event);
  }

  // edit event
  function editEventFunction() {
    // 
    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        return {
          ...event,
          title: formData.title,
          description: formData.description
        };
      }
      return event;
    });
    
    // console.log('event should be edited:', editedEvent )
    setEvents(updatedEvents);
    setSelectedEvent(null);
    setIsEditing(false);
    setShowModal(false);
  }

  function closeModal() {
    setShowModal(false);
  }

  function deleteEvent(){
    // creates array that excludes the item
    const updatedEvents = events.filter(event => event.id !== selectedEvent.id)
    // console.log(updatedEvents)
    // update the state
    setEvents(updatedEvents);
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
user clicks edit button this is what triggers the functjion to call editEventFunction
submits data from the edit function
*/