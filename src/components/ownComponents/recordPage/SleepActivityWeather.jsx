// import subcomponents
import { WeatherToggles } from "@/components/usedDemoComponents/WeatherToggles";
import { ActivitySwitch } from "@/components/usedDemoComponents/ActivitySwitch";
import SleepRecord from "./SleepRecord";
import { Card } from "@/components/ui/card";
import { useUserContext } from "../../../utils/UserProvider";
import { Badge } from "@/components/ui/badge";

//TODO: Fix Styling

const SleepActivityWeather = () => {
  // get States from UserProvider:
  const { config } = useUserContext();

  return (
    <div className="flex flex-col items-center">
      <section className="mt-16">
        {config && config.sleepingHours && (
          <div>
            <p className="inline">Schlafzeit</p>
            <Badge className="inline" variant="secondary">
              optional
            </Badge>
            <Card className="w-[290px] bg-white p-[22px] mt-4 mb-7 h-[423px/3] flex flex-col justify-center relative ">
              <SleepRecord />
            </Card>
          </div>
        )}
        {config && config.physicalActivity && (
          <div>
            <p className="inline">Körperliche Aktivität</p>
            <Badge className="inline" variant="secondary">
              optional
            </Badge>

            <Card className="w-[290px] bg-white p-[22px] mt-4 mb-7 h-[423px/3] flex flex-col justify-center relative ">
              {/* Switch */}
              <ActivitySwitch />
            </Card>
          </div>
        )}
        {config && config.weather && (
          <div>
            <p className="inline">Wetter</p>
            <Badge className="inline" variant="secondary">
              optional
            </Badge>

            <Card className="w-[290px] bg-white p-[22px] mt-4 mb-7 h-[423px/3] flex flex-col justify-center relative ">
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
