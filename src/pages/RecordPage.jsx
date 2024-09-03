import FeelingsFamilyButton from "@/components/ownComponents/recordPage/FeelingsFamilyButton";

import React, { useState } from "react";

// test data for feelings families and sub-feelings
const feelingsFamilies = [
  { id: "fear", name: "Fear" },
  { id: "joy", name: "Joy" },
  { id: "sadness", name: "Sadness" },
  { id: "relaxation", name: "Relaxation" },
];

const getSubFeelings = (familyId) => {
  // Replace with actual logic for fetching sub-feelings (standard from FE and custom from BE)
  const data = {
    fear: [
      { id: "anxiety", name: "Anxiety" },
      { id: "terror", name: "Terror" },
      { id: "panic", name: "Panic" },
    ],
    joy: [
      { id: "happiness", name: "Happiness" },
      { id: "excitement", name: "Excitement" },
    ],
    sadness: [
      { id: "grief", name: "Grief" },
      { id: "despair", name: "Despair" },
    ],
    relaxation: [
      { id: "calmness", name: "Calmness" },
      { id: "peace", name: "Peace" },
    ],
  };
  return data[familyId] || [];
};

// FeelingsSelector component (to be extracted to a separate file)
const FeelingsSelector = ({ subFeelings, onSelectFeeling }) => (
  <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md text-center max-w-md mx-auto">
    <ul className="list-none p-0">
      {subFeelings.map((feeling) => (
        <li
          key={feeling.id}
          onClick={() => onSelectFeeling(feeling)}
          className="cursor-pointer px-4 py-2 border border-gray-200 mb-2 rounded-md hover:bg-gray-100"
        >
          {feeling.name}
        </li>
      ))}
    </ul>
  </div>
);

const RecordPage = () => {
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [subFeelings, setSubFeelings] = useState([]);
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const handleFamilySelect = (familyId) => {
    setSelectedFamily(familyId);
    setSubFeelings(getSubFeelings(familyId));
    setSelectedFeeling(null); // Reset selected feeling when changing family
  };

  const handleFeelingSelect = (feeling) => {
    setSelectedFeeling(feeling);
    // store the selected feeling for the following process
    // for debugging:
    console.log("Selected Feeling:", feeling);
  };

  return (
    <main className="pt-[109px] px-[50px] flex flex-col items-center">
      <div className="p-6 flex flex-col items-center">
        <FeelingsFamilyButton
          feelingsFamilies={feelingsFamilies}
          onSelectedFamily={handleFamilySelect}
        />

        <div className="mt-6">
          {selectedFamily && (
            <FeelingsSelector
              subFeelings={subFeelings}
              onSelectFeeling={handleFeelingSelect}
            />
          )}
        </div>

        {selectedFeeling && (
          <div className="mt-6 text-center">
            <p className="text-md">{selectedFeeling.name}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default RecordPage;
