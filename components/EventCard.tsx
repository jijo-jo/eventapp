import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { EventCardProps } from '@types';

const EventCard: React.FC<EventCardProps> = ({
    eventName,
    address,
    onEdit,
    onDelete,
    onView,
}) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 relative max-w-md">
            <img
                src="/download.jpeg"
                alt="party logo"
                className="w-20 h-12 mb-4"
            />

            <div className="absolute top-4 right-4 flex space-x-2">
                <button onClick={onView} className="p-2 hover:bg-gray-100 rounded-full">
                    <FaEye className="text-gray-600" />
                </button>
                <button onClick={onEdit} className="p-2 hover:bg-gray-100 rounded-full">
                    <FaEdit className="text-blue-600" />
                </button>
                <button onClick={onDelete} className="p-2 hover:bg-gray-100 rounded-full">
                    <FaTrash className="text-red-600" />
                </button>
            </div>

            <h2 className="text-2xl font-semibold text-orange-600">{eventName}</h2>
            <p className="text-gray-600 mt-2">{address}</p>
        </div>
    );
};

export default EventCard;
