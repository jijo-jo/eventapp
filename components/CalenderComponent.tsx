'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '@types';
import { EventClickArg } from '@fullcalendar/core';
import EventDetailsModal from './EventDetailsModal';

const CalendarComponent = () => {
    const [nonFormatevents, setNonFormatEvents] = useState<Event[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
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

    return (
        <div className="p-4 mt-16">
            <div className="w-full calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
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
                />
            )}
        </div>
    );
};

export default CalendarComponent;







