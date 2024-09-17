import { Slider } from "@/components/ui/slider";
import { useCheckinContext } from "@/utils/CheckinProvider";
import { useEffect, useState } from "react";

/////// Helper functions: ///////

// convert slider value (0-23) to German hours (17 Uhr - 16 Uhr)
const sliderToHours = (value) => (value + 17) % 24;

// Calculate sleep duration
const calculateSleepDuration = (start, end) => {
  const startHour = sliderToHours(start);
  const endHour = sliderToHours(end);
  return endHour >= startHour ? endHour - startHour : 24 - startHour + endHour;
};

/////// Main component: ///////

const SleepRecord = () => {
  // States:
  const {
    sleepingHours,
    setSleepingHours,
    sleepingHoursRecorded,
    fetchSleepingHours,
  } = useCheckinContext();
  const [range, setRange] = useState([6, 15]); // default: 23 to 9 (internally plus 17 hours)

  // Fetch and use today's sleeping hours if available
  useEffect(() => {
    fetchSleepingHours();
  }, []);

  //   Function handle slider change
  const handleSliderChange = (newRange) => {
    setRange(newRange);
    const sleepingRange = calculateSleepDuration(newRange[0], newRange[1]);
    setSleepingHours(sleepingRange);
  };

  return (
    <div>
      {!sleepingHoursRecorded && (
        <p>
          Von {sliderToHours(range[0])} Uhr bis {sliderToHours(range[1])} Uhr
        </p>
      )}
      <p>
        {!sleepingHoursRecorded && `(`}
        {sleepingHours} Stunden{!sleepingHoursRecorded && `)`}
      </p>
      {!sleepingHoursRecorded && (
        <Slider
          min={0} // After converting: 17:00 Uhr
          max={22} // After converting: 16:00 Uhr
          step={1}
          value={range}
          onValueChange={handleSliderChange}
        />
      )}
    </div>
  );
};

export default SleepRecord;
