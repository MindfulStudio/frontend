import { Slider } from "@/components/ui/slider";
import { useCheckinContext } from "@/utils/CheckinProvider";
import { useEffect, useState } from "react";
import UserFeedbackText from "@/components/typo/UserFeedbackText";

// Helper functions:

// convert slider value (0-23) to German hours (17 Uhr - 16 Uhr)
const sliderToHours = (value) => (value + 17) % 24;

// Calculate sleep duration
const calculateSleepDuration = (start, end) => {
  // Local States:
  const startHour = sliderToHours(start);
  const endHour = sliderToHours(end);
  return endHour >= startHour ? endHour - startHour : 24 - startHour + endHour;
};

const SleepRecord = () => {
  const {
    sleepingHours,
    setSleepingHours,
    sleepingHoursRecorded,
    fetchSleepingHours,
  } = useCheckinContext();

  const [range, setRange] = useState([6, 15]); // Default range: 23:00 - 16:00

  // Fetch and use today's sleeping hours if available
  useEffect(() => {
    setSleepingHours(9);
    fetchSleepingHours();
  }, []);

  // Set the range based on recorded sleeping hours
  useEffect(() => {
    if (sleepingHoursRecorded) {
      const startHour = (24 + 17 - sleepingHours) % 24;
      const endHour = 17;
      setRange([startHour - 17, endHour - 17]);
    }
  }, [sleepingHoursRecorded, sleepingHours]);

  //   Function handle slider change
  const handleSliderChange = (newRange) => {
    if (!sleepingHoursRecorded) {
      setRange(newRange);
      const sleepingRange = calculateSleepDuration(newRange[0], newRange[1]);
      setSleepingHours(sleepingRange);
    }
  };

  return (
    <div className=" mt-1 mb-1">
      {!sleepingHoursRecorded && (
        <p>
          Von {sliderToHours(range[0])} Uhr bis {sliderToHours(range[1])} Uhr
        </p>
      )}
      <p className="pb-3">{sleepingHours} Stunden</p>

      <Slider
        min={0} // After converting: 17:00 Uhr
        max={22} // After converting: 16:00 Uhr
        step={1}
        value={range}
        onValueChange={handleSliderChange}
        disabled={sleepingHoursRecorded}
      />

      {sleepingHoursRecorded && (
        <UserFeedbackText
          content="Du kannst diese Angabe pro Tag nur einmal machen."
          type="info"
        />
      )}
    </div>
  );
};

export default SleepRecord;
