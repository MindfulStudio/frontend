import { createContext, useContext, useState } from "react";

const RecordProgressContext = createContext();

export const useRecordProgressContext = () => {
  return useContext(RecordProgressContext);
};

const RecordProgressProvider = ({ children }) => {
  const [checkinStep, setCheckinStep] = useState(1);
  const totalCheckinSteps = 5;

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

  return (
    <RecordProgressContext.Provider
      value={{
        checkinStep,
        totalCheckinSteps,
        nextCheckinStep,
        previousCheckinStep,
      }}
    >
      {children}
    </RecordProgressContext.Provider>
  );
};

export default RecordProgressProvider;
