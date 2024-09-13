//TODOS:
// Request to Backend to check, if there are already any data for the current day => getCheckInsFromToday
// If there are already data, show them in the respective fields
// If not, give the user the possibility to add data
// It could be, that the user has already added data for the current day, but wants to change them. For example had no physcal acitvity in the morning, when the first checkin was made, but later on did some sports and wants to add this information for this check in; also the weather can change during the day
// time data in hours and minutes
// acitvity data in form of toggle true/false aka. yes/no
// weather data in form of weather icons, which can be selected (toggle? radio?)
// The user should be able to change the data for the current checkin, but not for the previous ones.
// It also should be possible, that the user can skip this part of the check in or skip selected parts of it (e.g. only check in the weather, but not the sleep time; only change the sleep time, but not the acitvity, etc.) > Does every section need an own skip button? Or is it enough to allow the skip for this whole part of the recordprocess?

import StormyBlack from "/src/assets/icons/cloud-lightning-svgrepo-com-b.svg";
import RainyBlack from "/src/assets/icons/rain-svgrepo-com.svg";
import WindyBlack from "/src/assets/icons/wind-svgrepo-com.svg";
import CloudyBlack from "/src/assets/icons/sun-cloudy-svgrepo-com.svg";
import SunnyBlack from "/src/assets/icons/sun-svgrepo-com-1.svg";
import StormyWhite from "/src/assets/icons/cloud-lightning-svgrepo-com-w.svg";
import RainyWhite from "/src/assets/icons/rain-svgrepo-com-1.svg";
import WindyWhite from "/src/assets/icons/wind-svgrepo-com-1.svg";
import CloudyWhite from "/src/assets/icons/sun-cloudy-svgrepo-com-1.svg";
import SunnyWhite from "/src/assets/icons/sun-svgrepo-com-2.svg";

import { ToggleGroup } from "@/components/ui/toggle-group";
import { ToggleGroupConfigData } from "@/components/usedDemoComponents/ToggleGroupConfigData";
import { ActivitySwitch } from "@/components/usedDemoComponents/ActivitySwitch";

import { useState } from "react";
import SleepRecord from "./SleepRecord";

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
          <ToggleGroupConfigData />
        </div>
      </section>
    </div>
  );
};

export default SleepActivityWeather;
