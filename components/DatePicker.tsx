import { DatePickerProps } from "@types";

const DatePicker = ({ selectedDate, onDateChange }: DatePickerProps) => {

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDateChange(e.target.value);
    };

    return (
        <div className="relative w-full max-w-sm">
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"

            />
        </div>
    );
};

export default DatePicker;

