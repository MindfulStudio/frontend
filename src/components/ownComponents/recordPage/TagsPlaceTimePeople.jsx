import React from "react";

const TagsPlaceTimePeople = () => {
  return (
    <div className="flex flex-col items-center">
      <p>Wann hast du dich ... gefühlt?</p>
      <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll"></div>

      <p>Wo hast du dich ... gefühlt?</p>
      <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll"></div>

      <p>Mit wem hast du dich ... gefühlt?</p>
      <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll"></div>
    </div>
  );
};

export default TagsPlaceTimePeople;
