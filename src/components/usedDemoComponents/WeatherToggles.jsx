import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import StormyBlack from "/src/assets/icons/cloud-lightning-svgrepo-com-b.svg";
import RainyBlack from "/src/assets/icons/rain-svgrepo-com.svg";
import WindyBlack from "/src/assets/icons/wind-svgrepo-com.svg";
import CloudyBlack from "/src/assets/icons/sun-cloudy-svgrepo-com.svg";
import SunnyBlack from "/src/assets/icons/sun-svgrepo-com-1.svg";
import SnowBlack from "/src/assets/icons/snow-svgrepo-com-4.svg";

import StormyWhite from "/src/assets/icons/cloud-lightning-svgrepo-com-w.svg";
import RainyWhite from "/src/assets/icons/rain-svgrepo-com-1.svg";
import WindyWhite from "/src/assets/icons/wind-svgrepo-com-1.svg";
import CloudyWhite from "/src/assets/icons/sun-cloudy-svgrepo-com-1.svg";
import SunnyWhite from "/src/assets/icons/sun-svgrepo-com-2.svg";
import SnowWhite from "/src/assets/icons/snow-svgrepo-com-3.svg";

import { useCheckinContext } from "@/utils/CheckinProvider";

export function WeatherToggles() {
  const { selectedWeather, setSelectedWeather } = useCheckinContext();

  const handleWeatherChange = (weather) => {
    setSelectedWeather(weather);
    console.log("Selected Weather:", weather); // for debugging
  };

  return (
    <section className="flex flex-col items-center justify-center mt-4 mb-4">
      <ToggleGroup
        type="single"
        size="weather"
        value={selectedWeather}
        onValueChange={handleWeatherChange}
        aria-label="Select weather"
        className="grid grid-cols-3 gap-6"
      >
        <ToggleGroupItem
          value="sonnig"
          aria-label="sonnig"

          /*  className={`${selectedWeather === "sonnig" ? "bg-black" : "bg-white"}`} */
        >
          {selectedWeather === "sonnig" ? (
            <SunnyWhite className="h-8 w-8" />
          ) : (
            <SunnyBlack className="h-8 w-8" />
          )}
        </ToggleGroupItem>

        <ToggleGroupItem value="regnerisch" aria-label="regnerisch">
          {selectedWeather === "regnerisch" ? (
            <RainyWhite className="h-8 w-8" />
          ) : (
            <RainyBlack className="h-8 w-8" />
          )}
        </ToggleGroupItem>

        <ToggleGroupItem value="bewölkt" aria-label="bewölkt">
          {selectedWeather === "bewölkt" ? (
            <CloudyWhite className="h-8 w-8" />
          ) : (
            <CloudyBlack className="h-8 w-8" />
          )}
        </ToggleGroupItem>

        <ToggleGroupItem value="stürmisch" aria-label="stürmisch">
          {selectedWeather === "stürmisch" ? (
            <StormyWhite className="h-8 w-8" />
          ) : (
            <StormyBlack className="h-8 w-8" />
          )}
        </ToggleGroupItem>

        <ToggleGroupItem value="windig" aria-label="windig">
          {selectedWeather === "windig" ? (
            <WindyWhite className="h-8 w-8" />
          ) : (
            <WindyBlack className="h-8 w-8" />
          )}
        </ToggleGroupItem>

        <ToggleGroupItem
          value="schneit"
          aria-label="schneit"
          /* className={`${selectedWeather === "schneit" ? "bg-black" : "bg-white"}`} */
        >
          {selectedWeather === "schneit" ? (
            <SnowWhite className="h-8 w-8" />
          ) : (
            <SnowBlack className="h-8 w-8" />
          )}
        </ToggleGroupItem>
      </ToggleGroup>
    </section>
  );
}
