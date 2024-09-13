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

import { useUserContext } from "@/utils/UserProvider";

export function WeatherToggles() {
  const { selectedWeather, setSelectedWeather } = useUserContext();

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
        value="sunny"
        aria-label="Sunny"
        className={`${
          selectedWeather === "sunny" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "sunny" ? (
          <SunnyWhite className="h-8 w-8" />
        ) : (
          <SunnyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="rainy"
        aria-label="Rainy"
        className={`${
          selectedWeather === "rainy" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "rainy" ? (
          <RainyWhite className="h-8 w-8" />
        ) : (
          <RainyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="cloudy"
        aria-label="Cloudy"
        className={`${
          selectedWeather === "cloudy" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "cloudy" ? (
          <CloudyWhite className="h-8 w-8" />
        ) : (
          <CloudyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="stormy"
        aria-label="Stormy"
        className={`${
          selectedWeather === "stormy" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "stormy" ? (
          <StormyWhite className="h-8 w-8" />
        ) : (
          <StormyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="windy"
        aria-label="Windy"
        className={`${
          selectedWeather === "windy" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "windy" ? (
          <WindyWhite className="h-8 w-8" />
        ) : (
          <WindyBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>

      <ToggleGroupItem
        value="snowy"
        aria-label="Snowy"
        className={`${
          selectedWeather === "snowy" ? "bg-black" : "bg-white"
        } p-2 rounded-md`}
      >
        {selectedWeather === "snowy" ? (
          <SnowWhite className="h-8 w-8" />
        ) : (
          <SnowBlack className="h-8 w-8" />
        )}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
