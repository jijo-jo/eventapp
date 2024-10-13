"use client"
import EditEvent from "@components/EditEvent";
import { useParams } from "next/navigation";

const EditEventPage = () => {
    const { id } = useParams();

    return (
        <div>
            <EditEvent eventId={id} />
        </div>
    );
};

export default EditEventPage;
