// import Providers
import { useCheckinContext } from "../../../utils/CheckinProvider";
import { useUserContext } from "../../../utils/UserProvider";

// import subcomponents
import { WeatherToggles } from "@/components/usedDemoComponents/WeatherToggles";
import { ActivitySwitch } from "@/components/usedDemoComponents/ActivitySwitch";
import SleepRecord from "./SleepRecord";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeInfoPopup } from "./BadgeInfoPopup";

const badgeInfoMessages = {
  sleep:
    "Hier kannst du optional eine grobe Einschätzung deiner Schlafzeit machen. \n Dies wird ausgewertet, um dir einen groben Überblick über die Verbindung zwischen deinem Schlaf und deinen Gefühlen zu geben.",
  activity:
    "Hier kannst du optional angeben, ob du heute körperlich aktiv warst. \n Im Journal kannst du durch diese Angabe auch einen Eindruck über deine Aktivität und deine Gefühle erhalten.",
  weather:
    "Wie ist das Wetter im Moment? \n Im Journal kannst du durch diese optionale Angabe auch einen Überblick über das Wetter und deine Stimmungen erhalten.",
};

const SleepActivityWeather = () => {
  // get States from UserProvider:
  const { config } = useUserContext();

  // get States from CheckinProvider:
  const { showBadgeInfo, setShowBadgeInfo, handleBadgeClick } =
    useCheckinContext();

  return (
    <div className="flex flex-col items-center">
      <section className="mt-16">
        {config && config.sleepingHours && (
          <div>
            <p className="inline">Schlafzeit</p>
            <Badge
              className="inline"
              variant="secondary"
              onClick={() => handleBadgeClick("sleep")}
            >
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
            <Badge
              className="inline"
              variant="secondary"
              onClick={() => handleBadgeClick("activity")}
            >
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
            <Badge
              className="inline"
              variant="secondary"
              onClick={() => handleBadgeClick("weather")}
            >
              optional
            </Badge>

            <Card className="w-[290px] bg-white p-[22px] mt-4 mb-7 h-[423px/3] flex flex-col justify-center relative ">
              {/* Weather */}
              <WeatherToggles />
            </Card>
          </div>
        )}
      </section>
      {showBadgeInfo && (
        <BadgeInfoPopup
          message={badgeInfoMessages[showBadgeInfo]}
          onClose={() => setShowBadgeInfo(null)}
        />
      )}
    </div>
  );
};

export default SleepActivityWeather;
