//TODO: Request to Backend to check, if there are already any data for the current day => getCheckInsFromToday

//TODO: Check later, when the Recordprocess is connected to the Backend: It also should be possible, that the user can skip this part of the check in or skip selected parts of it (e.g. only check in the weather, but not the sleep time; only change the sleep time, but not the acitvity, etc.) > Does every section need an own skip button? Or is it enough to allow the skip for this whole part of the recordprocess?

// import subcomponents
import { WeatherToggles } from "@/components/usedDemoComponents/WeatherToggles";
import { ActivitySwitch } from "@/components/usedDemoComponents/ActivitySwitch";
import SleepRecord from "./SleepRecord";
import { Card } from "@/components/ui/card";

//TODO: Fix Styling

//TODO: The logic for retrieving the data (e.g. getCheckInsFromToday) must be inserted

const SleepActivityWeather = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="mt-16">
        <p>Deine Schlafzeit</p>
        <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3]">
          <SleepRecord />
        </Card>
        <p>Körperliche Bewegung:</p>
        <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3]">
          {/* Switch */}
          <ActivitySwitch />
        </Card>
        <p>Das Wetter ist...</p>
        <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3]">
          {/* Weather */}
          <WeatherToggles />
        </Card>
      </section>
    </div>
  );
};

export default SleepActivityWeather;
