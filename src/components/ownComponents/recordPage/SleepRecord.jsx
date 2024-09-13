import React from "react";
import { useState, useEffect } from "react";

// TODO: change time unit from am/pm to units used in germany

const SleepRecord = () => {
  const [sleepStart, setSleepStart] = useState(""); // not send to the backend
  const [sleepEnd, setSleepEnd] = useState(""); // not send to the backend
  const [sleepingHours, setSleepingHours] = useState(""); // this state will be send to the backend

  useEffect(() => {
    if (sleepStart && sleepEnd) {
      const start = new Date(`1970-01-01T${sleepStart}`);
      const end = new Date(`1970-01-01T${sleepEnd}`);
      const duration = Math.abs(end - start);

      const hours = Math.floor(duration / 1000 / 60 / 60);
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

      setSleepingHours(`${hours} Stunden ${minutes} Minuten`);
      console.log("Schlaf:" + sleepingHours);
    } else {
      setSleepingHours("");
    }
  }, [sleepStart, sleepEnd]);

  return (
    <div>
      <p>
        Ich habe von
        <input
          type="time"
          value={sleepStart}
          onChange={(e) => setSleepStart(e.target.value)}
        />
        bis
        <input
          type="time"
          value={sleepEnd}
          onChange={(e) => setSleepEnd(e.target.value)}
        />
        geschlafen.
      </p>
      {sleepingHours && <p>Schlafzeit: {sleepingHours}</p>}
    </div>
  );
};

export default SleepRecord;
