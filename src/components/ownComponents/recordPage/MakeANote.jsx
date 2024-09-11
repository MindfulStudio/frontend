import React from "react";

const MakeANote = () => {
  return (
    <div className="flex flex-col items-center">
      <p>Möchtest du noch etwas zu deinem Gefühl notieren?</p>
      <div className="w-[290px] bg-white p-[22px] text-center mt-16 h-[423px] overflow-y-scroll">
        {/* Adapt textarea width and height */}
        <textarea
          name="textarea"
          id="textarea"
          placeholder="Hier ist Platz für deine Notiz."
          autoFocus
        ></textarea>
      </div>
    </div>
  );
};

export default MakeANote;
