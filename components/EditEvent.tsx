"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import EventForm from "@components/EventForm";
import { Event } from "@types";

const EditEvent = ({ eventId }: { eventId: string | string[] }) => {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
        setEvents(storedEvents);
        const event = storedEvents.find((e: Event) => e.id === eventId);
        if (event) {
            setEventToEdit(event);
        }
    }, [eventId]);

    const handleSubmit = (updatedEvent: Event) => {
        const updatedEvents = events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        router.push(`/`);
    };

    return eventToEdit ? <EventForm initialEvent={eventToEdit} onSubmit={handleSubmit} /> : null;
};

export default EditEvent;
