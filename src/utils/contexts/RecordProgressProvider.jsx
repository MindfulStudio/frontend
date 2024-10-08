import { createContext, useContext, useState } from "react";

const RecordProgressContext = createContext();
export const useRecordProgressContext = () => useContext(RecordProgressContext);

const RecordProgressProvider = ({ children }) => {
  const [checkinStep, setCheckinStep] = useState(1);
  const [totalCheckinSteps, setTotalCheckinSteps] = useState(5);

  const nextCheckinStep = () => {
    if (checkinStep < totalCheckinSteps) {
      setCheckinStep((prevStep) => prevStep + 1);
    }
  };

  const previousCheckinStep = () => {
    if (checkinStep > 1) {
      setCheckinStep((prevStep) => prevStep - 1);
    }
  };

  const resetCheckinStep = () => {
    setCheckinStep(1);
  };

  return (
    <RecordProgressContext.Provider
      value={{
        checkinStep,
        totalCheckinSteps,
        setTotalCheckinSteps,
        nextCheckinStep,
        previousCheckinStep,
        resetCheckinStep,
      }}
    >
      {children}
    </RecordProgressContext.Provider>
  );
};

export default RecordProgressProvider;
