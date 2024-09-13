import React from "react";
import { useState } from "react";

const SleepRecord = () => {
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");

  return (
    <div>
      <p>
        Ich habe von <input type="time" /> bis <input type="time" /> geschlafen.
      </p>
      <p>... Stunden</p>
    </div>
  );
};

export default SleepRecord;
