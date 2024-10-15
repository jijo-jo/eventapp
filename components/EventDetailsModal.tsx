import React from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { EventDetailsModalProps } from '@types';

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  eventName,
  address,
  startDate,
  endDate,
  onEdit,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
      <div className="absolute top-4 right-4 flex space-x-2">
          {onEdit && (
            <button onClick={onEdit} className="text-gray-600 hover:text-blue-500">
              <FaEdit className="text-2xl" /> 
            </button>
          )}
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            <FaTimes className="text-2xl" /> 
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-orange-600 mb-4">{eventName}</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Address: </span>
          {address}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Start Date: </span>
          {formatDate(startDate)}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">End Date: </span>
          {formatDate(endDate)}
        </p>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
