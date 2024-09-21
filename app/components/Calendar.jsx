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
import Button from './Button';
import { useSession } from "next-auth/react"
import c from './Calendar.module.css';

function formatDateToYMD(date) {
  return date.toISOString().split('T')[0];
}

const url = 'https://www.aphroditecharters.com';
// const url = 'http://localhost:3000';

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
    publicView: false,
    charter: false,
    customer: {
      name: '',
      email: '',
      phone: '',
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewIndex, setViewIndex] = useState(1)
  const calendarApiRef = useRef();
  const { data: session, status } = useSession();

  // console.log(session)

  useEffect(() => {
    loadTasks();
  }, []);


  // Populate tasks
  async function loadTasks() {
    try {
      const res = await axios.get(`${url}/api/calendar`);
      const currentTasks = res.data.tasks;
      setEvents(currentTasks);
    } catch (error) {
      console.log(error);
    }
  }

  // create event
  function createEventTask(formData) {
    // when submitting for the first time
    const eventId = uuidv4();

    const newEvent = {
      eventId,
      start: formData.time ? formData.start + ' ' + formData.time : formData.start,
      end: formData.end,
      time: formData.time,
      title: formData.title,
      description: formData.description,
      publicView: formData.publicView,
      charter: formData.charter,
      customer: formData.customer,
    };
    setShowModal(false);
    setEvents([...events, newEvent]);
    setIsEditing(false);
    axios.post(`${url}/api/calendar`, newEvent);
  }

  // edit event is triggered when you save it.
  async function editEventTask() {

    try {
      const eventId = selectedEvent._def.extendedProps.eventId;
      const indexToUpdate = events.findIndex(event => event.eventId === eventId);
      if(indexToUpdate !== -1){
        // copy task array
        const updatedEvents = [...events];
        
        // update the task at index position, thi will be the obj to update
        updatedEvents[indexToUpdate] = {
          // spread other props into this obj or overwrite existing
          
          ...updatedEvents[indexToUpdate],
          start: formData.time ? formData.start + ' ' + formData.time : formData.start,
          end: formData.end,
          time: formData.time,
          title: formData.title,
          description: formData.description,
          publicView: formData.publicView,
          charter: formData.charter,
          customer: formData.customer,
        }

        setEvents(updatedEvents)
        await axios.put(`${url}/api/calendar`, updatedEvents[indexToUpdate]);
        setSelectedEvent(null);
        setIsEditing(false);
        setShowModal(false);
        setEditEvent(false);
      }else {
        console.error(`Event with eventId ${eventId} not found.`);
      }
      // reloads tasks
      await loadTasks()
    } catch (error) {
      console.log(error);
    }
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
      publicView: false,
      charter: false,
      
    };

    setFormData(newEvent);
    setEditEvent(false);
    setShowModal(true);
    setIsEditing(true);
  }

  // when clicked opens modal and loads info from event
  async function eventClick(eventClickInfo) {
    setShowModal(true);
    setSelectedEvent(eventClickInfo.event);
    const clickedEvent = eventClickInfo.event;
    const title = clickedEvent.title;
    const description = clickedEvent.extendedProps?.description;
    const startDate = formatDateToYMD(clickedEvent._instance.range.start);
    const endDate = formatDateToYMD(
      clickedEvent._instance.range.end || clickedEvent._instance.range.start
    );
    const eventId = clickedEvent.extendedProps?.eventId;
    const time = clickedEvent.extendedProps?.time;
    const publicView = clickedEvent.extendedProps?.publicView;
    const charter = clickedEvent.extendedProps?.charter;
    const customer = clickedEvent.extendedProps?.customer || { name: '', email: '', phone: '' }


    setFormData({
      eventId,
      start: startDate,
      end: endDate,
      time,
      title,
      description,
      publicView,
      charter,
      customer,
    });

  }

  function closeModal() {
    setShowModal(false);
    setEditEvent(false);
    setIsEditing(false);
    setSelectedEvent(null);
  }

  async function deleteEvent() {
    // alert('Are you sure you want to delete this event?');
    try {
      const eventId = selectedEvent._def.extendedProps?.eventId;
      await axios.delete(`${url}/api/calendar`, {
        headers: { eventId: eventId }, // Custom header for eventId
      });

      setEvents((prevEvents) => prevEvents.filter(event => event.eventId !== eventId)) 
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  function openEditor() {
    setEditEvent(true);
    setIsEditing(true);
  }

  function toogleView(){
    const view = ['dayGridMonth', 'dayGridWeek', 'timeGridDay'];
    setViewIndex((viewIndex + 1) % view.length)
    const calendarApi = calendarApiRef.current.getApi();
    calendarApi.changeView(view[viewIndex])
  }

  return (
    <>
      {showModal && (
        <Modal
          formData={formData}
          setFormData={setFormData}
          onSubmit={createEventTask}
          onEditSubmit={editEventTask}
          onCloseModal={closeModal}
          editEvent={editEvent}
          onDelete={deleteEvent}
          isEditing={isEditing}
          onEdit={openEditor}
          showModal={showModal}
          session={session}
        />
      )}

      <div className={c.container}>
        <div className={c.contentContainer}>
          <div className={c.btnContainer}>
          {session && <Button className={c.btn} onClick={displayModal}>Add</Button> }
          <Button className={c.btn} onClick={toogleView}>Toogle View</Button>
          </div>
          <FullCalendar
            ref={calendarApiRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // initialView='dayGridWeek'
            contentHeight={570}
            weekends={true}
            headerToolbar={{
              start: 'prev,next',
              center: 'title',
              end: 'prevYear nextYear',
            }}
            // customButtons={{
            //   add: {
            //     text: 'Add',
            //     click: displayModal,
            //   }
            // }}
            selectable
            displayEventTime={true}
            events={events}
            eventClick={eventClick}
            editable={true}
          />
        </div>
      </div>
    </>
  );
}
