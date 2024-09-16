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
    <ToggleGroup
      type="single"
      value={selectedWeather}
      onValueChange={handleWeatherChange}
      aria-label="Select weather"
      className="flex space-x-2"
    >
      <ToggleGroupItem
        value="sonnig"
        aria-label="sonnig"
        className={`${
          selectedWeather === "sonnig" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "sonnig" ? (
          <SunnyWhite className="h-8 w-8" />
        ) : (
          <SunnyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="regnerisch"
        aria-label="regnerisch"
        className={`${
          selectedWeather === "regnerisch" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "regnerisch" ? (
          <RainyWhite className="h-8 w-8" />
        ) : (
          <RainyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="bewölkt"
        aria-label="bewölkt"
        className={`${
          selectedWeather === "bewölkt" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "bewölkt" ? (
          <CloudyWhite className="h-8 w-8" />
        ) : (
          <CloudyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="stürmisch"
        aria-label="stürmisch"
        className={`${
          selectedWeather === "stürmisch" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "stürmisch" ? (
          <StormyWhite className="h-8 w-8" />
        ) : (
          <StormyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="windig"
        aria-label="windig"
        className={`${
          selectedWeather === "windig" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "windig" ? (
          <WindyWhite className="h-8 w-8" />
        ) : (
          <WindyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="schneit"
        aria-label="schneit"
        className={`${
          selectedWeather === "schneit" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "schneit" ? (
          <SnowWhite className="h-8 w-8" />
        ) : (
          <SnowBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
