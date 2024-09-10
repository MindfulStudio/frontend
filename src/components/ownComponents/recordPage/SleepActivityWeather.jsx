import React from "react";

const SleepActivityWeather = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="mt-16">
        <p>Schlaf</p>
        <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll"></div>
        <p>Körperliche Aktivität</p>
        <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll"></div>
        <p>Wetter</p>
        <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll"></div>
      </section>
    </div>
  );
};

export default SleepActivityWeather;
