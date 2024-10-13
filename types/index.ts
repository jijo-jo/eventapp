import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
  }

export interface Event {
    id: string;
    eventName: string;
    address: string;
    startDate: string;
    endDate: string;
  }

export interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface DatePickerProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
}

export interface EventCardProps {
    eventName: string;
    address: string;
    onEdit: () => void;
    onDelete: () => void;
    onView: () => void;
}

export interface EventDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    address: string;
    startDate: string;
    endDate: string;
  }

export interface EventFormProps {
    initialEvent?: Event;
    onSubmit: (eventData: Event) => void;
}