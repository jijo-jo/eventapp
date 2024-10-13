"use client";

import { useState } from "react";
import { Event } from "@types";
import { EventFormProps } from "@types";

const EventForm = ({ initialEvent, onSubmit }: EventFormProps) => {
    const [eventName, setEventName] = useState(initialEvent?.eventName || "");
    const [address, setAddress] = useState(initialEvent?.address || "");
    const [startDate, setStartDate] = useState(initialEvent?.startDate || "");
    const [endDate, setEndDate] = useState(initialEvent?.endDate || "");

    const [errors, setErrors] = useState({
        eventName: "",
        address: "",
        startDate: "",
        endDate: "",
    });

    const validate = () => {
        let hasErrors = false;
        const newErrors = {
            eventName: "",
            address: "",
            startDate: "",
            endDate: "",
        };

        if (!eventName.trim()) {
            newErrors.eventName = "Event name is required";
            hasErrors = true;
        }

        if (!address.trim()) {
            newErrors.address = "Address is required";
            hasErrors = true;
        }

        if (!startDate) {
            newErrors.startDate = "Start date is required";
            hasErrors = true;
        }

        if (!endDate) {
            newErrors.endDate = "End date is required";
            hasErrors = true;
        }

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            newErrors.startDate = "Start date must be before end date";
            newErrors.endDate = "End date must be after start date";
            hasErrors = true;
        }

        setErrors(newErrors);
        return !hasErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            const eventData: Event = {
                id: initialEvent?.id || "",
                eventName,
                address,
                startDate,
                endDate,
            };

            onSubmit(eventData);

            setEventName("");
            setAddress("");
            setStartDate("");
            setEndDate("");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full md:w-4/5 lg:w-3/5 p-6 bg-orange-100 rounded-lg shadow-md mt-20">
                <h2 className="text-2xl font-bold mb-4">
                    {initialEvent ? "Edit Event" : "Create New Event"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Event Name
                        </label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                            className={`mt-1 block w-full px-3 py-2 border ${errors.eventName ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                        />
                        {errors.eventName && (
                            <p className="text-red-500 text-sm">{errors.eventName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className={`mt-1 block w-full px-3 py-2 border ${errors.address ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Start Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value)
                                e.target.blur();
                            }}
                            required
                            className={`mt-1 block w-full px-3 py-2 border ${errors.startDate ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                        />
                        {errors.startDate && (
                            <p className="text-red-500 text-sm">{errors.startDate}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            End Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value)
                                e.target.blur();
                            }}
                            required
                            className={`mt-1 block w-full px-3 py-2 border ${errors.endDate ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                        />
                        {errors.endDate && (
                            <p className="text-red-500 text-sm">{errors.endDate}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        {initialEvent ? "Update Event" : "Create Event"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventForm;

