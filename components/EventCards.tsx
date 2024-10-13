'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventCard, EventDetailsModal, DatePicker, ConfirmDeleteModal } from '@components';
import { Event } from '@types';

const EventCards = () => {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      const selected = new Date(selectedDate);
      const filteredEvents = storedEvents.filter((event: Event) => {
        const startDate = new Date(event.startDate.split('T')[0]);
        const endDate = new Date(event.endDate.split('T')[0]);
        return selected >= startDate && selected <= endDate;
      });

      setEvents(filteredEvents);
    }
  }, [selectedDate]);

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate');
    if (storedDate) {
      setSelectedDate(storedDate);
    } else {
      const today = formatDateToYYYYMMDD(new Date());
      setSelectedDate(today);
      localStorage.setItem('selectedDate', today);
    }
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/edit-event/${id}`);
  };

  const handleDelete = (id: string) => {
    setEventToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedEvents = events.filter((event) => event.id !== eventToDelete);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setIsDeleteModalOpen(false);
  };

  const handleSelectedDateChange = (date: string) => {
    localStorage.setItem('selectedDate', date);
    setSelectedDate(date);
  };


  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className="p-6 ml-2 md:ml-12">
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Pick a Date
        </label>
        <DatePicker selectedDate={selectedDate} onDateChange={handleSelectedDateChange} />
      </div>
      <h1 className="text-2xl mb-6">Events on {selectedDate}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventName={event.eventName}
            address={event.address}
            onEdit={() => handleEdit(event.id)}
            onDelete={() => handleDelete(event.id)}
            onView={() => handleView(event)}
          />
        ))}
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

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default EventCards;

