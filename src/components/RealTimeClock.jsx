import React, { useState, useEffect } from "react";

function RealTimeClock() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        // Update every second
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    // Format date and time
    const formattedDate = dateTime.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formattedTime = dateTime.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div style={{ fontSize: "10px" }}>
            <p>{formattedDate} {formattedTime}</p>
        </div >
    );
}

export default RealTimeClock;