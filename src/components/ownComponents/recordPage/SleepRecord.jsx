import React from "react";
import { useState, useEffect, useContext } from "react";

// TODO: change time unit from am/pm to units used in germany

import { useUserContext } from "../../../utils/UserProvider";

const SleepRecord = () => {
  const {
    sleepStart,
    setSleepStart,
    sleepEnd,
    setSleepEnd,
    sleepingHours,
    setSleepingHours,
  } = useUserContext();

  useEffect(() => {
    if (sleepStart && sleepEnd) {
      const start = new Date(`1970-01-01T${sleepStart}`);
      const end = new Date(`1970-01-01T${sleepEnd}`);
      const duration = Math.abs(end - start);

      const hours = Math.floor(duration / 1000 / 60 / 60);
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

      setSleepingHours(`${hours} Stunden ${minutes} Minuten`);
    } else {
      setSleepingHours("");
    }
  }, [sleepStart, sleepEnd]);

  // second useEffect to check if the changes of sleepingHours are correct (for debugging); can be deleted later
  useEffect(() => {
    console.log("Schlaf:" + sleepingHours); // for debugging
  }, [sleepingHours]);

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
