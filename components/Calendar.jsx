'use client';
import React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
import c from './Calendar.module.css';

export default function Calendar() {
  const [eventDetails, setEventDetails] = useState({ title: 'test' }); // for testing
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    start: '',
    end: '',
    title: '',
    description: '',
  });
  const [showModal, setShowModal] = useState(false);
  const calendarApiRef = useRef();

  // when you click you recieve a object that contains view, date...
  function handleDateClick(arg) {
    setShowModal(true);
    setEvents([...events, formData])
    // console.log(arg)
    // setEventDetails({ title: 'test' });
    // const calendarApi = arg.view.calendar;
    // // create new event
    // const newEvent = {
    //   title: 'test',
    //   description: 'todo xxxxx',
    //   start: arg.dateStr,
    //   end: '2024-03-30',
    // };
    // setEventDetails(newEvent);
    // calendarApi.addEvent(newEvent);
  }

  function handleFormSubmit(formData) {
    // when submitting for the first time
    const eventId = uuidv4(); 
    const newEvent = {
      id: eventId,
      start: formData.start,
      end: formData.end,
      title: formData.title,
      description: formData.description,
    }
    setShowModal(false);
    setEvents([...events, newEvent]);
  }
 
  // displays content inside event
  function renderEventContent() {
    return (
      <>
        {events.map((event, index) => (
          <div key={index}>
                <b>{event.title}</b>
                <p key={index}>{event.description}</p>
          </div>
        ))}
      </>
    );
  }

  // // button to show the modal when clicked
  function displayModal() {
    setFormData({
      id: '',
      start: '',
      end: '',
      title: '',
      description: '',
    });
    setShowModal(true);
  }

  function updateEvent(){

  }

  // compare id & set clicked event to be the one that was clicked.
  function eventClick(eventClickInfo){
    console.log(eventClickInfo.event.id)
    const clickId = eventClickInfo.event.id;
    const clickedEvent = events.find(event => event.id === clickId);
    setSelectedEvent(clickedEvent)
    setShowModal(true)

  }

  function closeModal(){
    setShowModal(false);
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
            // dateClick={handleDateClick}
            displayEventTime={true}
            eventContent={renderEventContent}
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
          onClick={closeModal}
        />
      )}
    </>
  );
}
