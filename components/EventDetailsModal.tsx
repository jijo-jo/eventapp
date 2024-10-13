import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { EventDetailsModalProps } from '@types';

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  eventName,
  address,
  startDate,
  endDate,
}) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <FaTimes className="text-2xl" />
        </button>

        <h2 className="text-2xl font-semibold text-orange-600 mb-4">{eventName}</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Address: </span>
          {address}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Start Date: </span>
          {startDate}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">End Date: </span>
          {endDate}
        </p>

        <button
          onClick={onClose}
          className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetailsModal;
