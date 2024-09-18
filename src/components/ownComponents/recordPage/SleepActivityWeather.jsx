// import subcomponents
import { WeatherToggles } from "@/components/usedDemoComponents/WeatherToggles";
import { ActivitySwitch } from "@/components/usedDemoComponents/ActivitySwitch";
import SleepRecord from "./SleepRecord";
import { Card } from "@/components/ui/card";
import { useUserContext } from "../../../utils/UserProvider";

//TODO: Fix Styling

const SleepActivityWeather = () => {
  // get States from UserProvider:
  const { config } = useUserContext();

  return (
    <div className="flex flex-col items-center">
      <section className="mt-16">
        {config && config.sleepingHours && (
          <div>
            <p>Deine Schlafzeit</p>
            <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3]">
              <SleepRecord />
            </Card>
          </div>
        )}
        {config && config.physicalActivity && (
          <div>
            <p>Körperliche Bewegung:</p>
            <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3]">
              {/* Switch */}
              <ActivitySwitch />
            </Card>
          </div>
        )}
        {config && config.weather && (
          <div>
            <p>Das Wetter ist...</p>
            <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3]">
              {/* Weather */}
              <WeatherToggles />
            </Card>
          </div>
        )}
      </section>
    </div>
  );
};

export default SleepActivityWeather;
