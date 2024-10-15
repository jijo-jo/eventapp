'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event, CalendarEventProps } from '@types';
import { EventClickArg } from '@fullcalendar/core';
import { useRouter } from 'next/navigation';
import EventDetailsModal from './EventDetailsModal';

const CalendarComponent = () => {
    const [nonFormatevents, setNonFormatEvents] = useState<Event[]>([]);
    const [events, setEvents] = useState<CalendarEventProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [currentDate, setCurrentDate] = useState(new Date());
    const router = useRouter();

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        setNonFormatEvents(storedEvents);
        const formattedEvents = storedEvents.map((event: Event) => ({
            id: event.id,
            title: `${event.eventName} - ${event.address}`,
            start: event.startDate,
            end: event.endDate,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
        }));

        setEvents(formattedEvents);
    }, []);

    const handleEventClick = (clickInfo: EventClickArg) => {
        const eventId = clickInfo.event._def.publicId;
        const clickedEvent = nonFormatevents.find(event => event.id === eventId);
        if (clickedEvent) {
            setSelectedEvent(clickedEvent);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };


    const handleEdit = (id: string) => {
        localStorage.setItem('calendarView', currentView);
        localStorage.setItem('calendarDate', currentDate.toISOString());
        router.push(`/edit-event/${id}?fromCalendar=true`);
    };


    const handleEventDrop = (eventInfo: any) => {
        const updatedEvents = nonFormatevents.map((event) => {
            if (event.id === eventInfo.event.id) {
                event.startDate = eventInfo.event.start.toISOString();
                event.endDate = eventInfo.event.end ? eventInfo.event.end.toISOString() : eventInfo.event.start.toISOString();
            }
            return event;
        });

        setNonFormatEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setEvents(updatedEvents.map(event => ({
            id: event.id,
            title: `${event.eventName} - ${event.address}`,
            start: event.startDate,
            end: event.endDate,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
        })));
    };

    const handleEventResize = (eventInfo: any) => {
        const updatedEvents = nonFormatevents.map((event) => {
            if (event.id === eventInfo.event.id) {
                event.startDate = eventInfo.event.start.toISOString();
                event.endDate = eventInfo.event.end ? eventInfo.event.end.toISOString() : eventInfo.event.start.toISOString();
            }
            return event;
        });

        setNonFormatEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setEvents(updatedEvents.map(event => ({
            id: event.id,
            title: `${event.eventName} - ${event.address}`,
            start: event.startDate,
            end: event.endDate,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
        })));
    };

    useEffect(() => {
        const savedView = localStorage.getItem('calendarView');
        const savedDate = localStorage.getItem('calendarDate');

        if (savedView) setCurrentView(savedView);
        if (savedDate) setCurrentDate(new Date(savedDate));
    }, []);

    return (
        <div className="p-4 mt-16">
            <div className="w-full calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={currentView}
                    initialDate={currentDate}
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    editable={true}
                    eventResizableFromStart={true}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    datesSet={(arg) => {
                        setCurrentView(arg.view.type);
                        setCurrentDate(arg.start);
                    }}
                />
            </div>

            {selectedEvent && (
                <EventDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    eventName={selectedEvent.eventName}
                    address={selectedEvent.address}
                    startDate={selectedEvent.startDate}
                    endDate={selectedEvent.endDate}
                    onEdit={() => handleEdit(selectedEvent.id)}
                />
            )}
        </div>
    );
};

export default CalendarComponent;









