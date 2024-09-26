import { getCheckinsFromToday } from "../services/getCheckinsFromToday";

export const getSleepingHours = async (
  setSleepingHours,
  setSleepingHoursRecorded
) => {
  try {
    const checkins = await getCheckinsFromToday();
    if (checkins && checkins.data[0]) {
      // set SleepingHours to value of today's first checkin
      const hours = checkins.data[0].config.sleepingHours;
      setSleepingHours(hours);
      setSleepingHoursRecorded(true);
    }
  } catch (error) {
    console.error("Error fetching sleeping hours:", error);
  }
};
