"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import EventForm from "@components/EventForm";
import { v4 as uuidv4 } from "uuid";
import { Event } from "@types";

const CreateEvent = () => {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        if (events.length !== 0) {
            localStorage.setItem("events", JSON.stringify(events));
        }
    }, [events]);

    const handleSubmit = (newEvent: Event) => {
        newEvent.id = uuidv4();
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        router.push(`/`);
    };

    return <EventForm onSubmit={handleSubmit} />;
};

export default CreateEvent;
