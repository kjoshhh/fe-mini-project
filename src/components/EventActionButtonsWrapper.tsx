"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import EventActionButtons from "./EventActionButtons";

interface EventActionButtonsWrapperProps {
    eventId: number;
    currentUserId: number | null;
    organizerId: number;
}

export default function EventActionButtonsWrapper({
    eventId,
    currentUserId,
    organizerId,
}: EventActionButtonsWrapperProps) {
    const router = useRouter();
    const isOrganizerOwner = currentUserId === organizerId;

    const handleEdit = () => {
        router.push(`/events/${eventId}/edit`); 
    };

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure want to delete this event?");
        if (!confirmed) return;

        try {
            const token = Cookies.get("token");

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                alert("Gagal menghapus event");
                return;
            }

            alert("Event berhasil dihapus");
            router.push("/"); 
        } catch (error) {
            console.error("Delete error:", error);
            alert("Terjadi kesalahan saat menghapus event");
        }
    };

    if (!isOrganizerOwner) return null;

    return (
        <EventActionButtons
            eventId={eventId}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}
