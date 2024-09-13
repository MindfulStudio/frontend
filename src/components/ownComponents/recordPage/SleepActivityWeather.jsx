//TODO: Request to Backend to check, if there are already any data for the current day => getCheckInsFromToday

//TODO: Check later, when the Recordprocess is connected to the Backend: It also should be possible, that the user can skip this part of the check in or skip selected parts of it (e.g. only check in the weather, but not the sleep time; only change the sleep time, but not the acitvity, etc.) > Does every section need an own skip button? Or is it enough to allow the skip for this whole part of the recordprocess?

// import subcomponents
import { ToggleGroupWeatherData } from "@/components/usedDemoComponents/ToggleGroupWeatherData";
import { ActivitySwitch } from "@/components/usedDemoComponents/ActivitySwitch";
import SleepRecord from "./SleepRecord";

//TODO: Fix Styling

//TODO: The logic for retrieving the data (e.g. getCheckInsFromToday) must be inserted

//TODO: states from the subcomponents that need to be send to the backend must be extracted to a contextprovider and this component and its subcomponent need refactoring to use the contextprovider

const SleepActivityWeather = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="mt-16">
        <p>Deine Schlafzeit</p>
        <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll">
          <SleepRecord />
        </div>
        <p>Körperliche Bewegung:</p>
        <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll">
          {/* Switch */}
          <ActivitySwitch />
        </div>
        <p>Das Wetter ist...</p>
        <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll">
          {/* Weather */}
          <ToggleGroupWeatherData />
        </div>
      </section>
    </div>
  );
};

export default SleepActivityWeather;
