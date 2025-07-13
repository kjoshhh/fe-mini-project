"use client";
import { useEffect, useState } from "react";

const Countdown = ({ expiredAt }: { expiredAt: string }) => {
    const calculateTimeLeft = () => {
        const diff = new Date(expiredAt).getTime() - new Date().getTime();
        const totalSeconds = Math.max(Math.floor(diff / 1000), 0);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}`;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [expiredAt]);

    return <span>{timeLeft}</span>;
};

export default Countdown;
