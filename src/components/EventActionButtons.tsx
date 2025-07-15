"use client";

import React, { useState } from "react";

interface EventActionButtonsProps {
    eventId: number;
    onEdit: () => void;
    onDelete: () => Promise<void>;
}

export default function EventActionButtons({
    eventId,
    onEdit,
    onDelete,
}: EventActionButtonsProps) {
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleEdit = () => {
        setLoadingEdit(true);
        try {
            onEdit();
        } finally {
            setLoadingEdit(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure want to delete this event?")) return;
        setLoadingDelete(true);
        try {
            await onDelete();
        } finally {
            setLoadingDelete(false);
        }
    };

    const renderSpinner = (
        <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="loading spinner"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );

    const baseButtonClass =
        "relative px-6 py-3 rounded-md shadow-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-offset-2";

    return (
        <div className="flex gap-6 mt-12 mb-8 px-4 justify-center">
            <button
                onClick={handleEdit}
                disabled={loadingEdit || loadingDelete}
                className={`${baseButtonClass} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white font-semibold shadow-blue-500/50`}
                aria-label="Edit Event"
            >
                {loadingEdit ? renderSpinner : "Edit"}
            </button>

            <button
                onClick={handleDelete}
                disabled={loadingDelete || loadingEdit}
                className={`${baseButtonClass} bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white font-semibold shadow-red-500/50`}
                aria-label="Delete Event"
            >
                {loadingDelete ? renderSpinner : "Delete"}
            </button>
        </div>
    );
}
