import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// import useState
import { useState } from "react";

// arrow icons
import ArrowLeft from "/src/assets/icons/arrow-left-svgrepo-com.svg";
import ArrowRight from "/src/assets/icons/arrow-right-svgrepo-com.svg";

// import subcomponents for the record page
import CheckInFeelingDisplay from "@/components/ownComponents/recordPage/CheckInFeelingDisplay.jsx";
import TagsPlaceTimePeople from "@/components/ownComponents/recordPage/TagsPlaceTimePeople.jsx";
import TagsContext from "@/components/ownComponents/recordPage/TagsContext.jsx";
import MakeANote from "@/components/ownComponents/recordPage/MakeANote.jsx";
import SleepActivityWeather from "@/components/ownComponents/recordPage/SleepActivityWeather.jsx";

//++ import EmotionsProvider
import { useEmotionsContext } from "@/utils/EmotionsProvider";

const RecordPage = () => {
  const { feelingsFamilies } = useEmotionsContext();

  const [checkinStep, setCheckinStep] = useState(1);

  const totalCheckinSteps = 5;

  const nextCheckinStep = () => {
    if (checkinStep < totalCheckinSteps) {
      setCheckinStep(checkinStep + 1);
    }
  };

  const previousCheckinStep = () => {
    if (checkinStep > 1) {
      setCheckinStep(checkinStep - 1);
    }
  };

  const renderCheckinStepComponent = () => {
    switch (checkinStep) {
      case 1:
        return feelingsFamilies.length > 0 && <CheckInFeelingDisplay />;
      case 2:
        return <TagsPlaceTimePeople />;
      case 3:
        return <TagsContext />;
      case 4:
        return <MakeANote />;
      case 5:
        return <SleepActivityWeather />;
      default:
        return <CheckInFeelingDisplay />;
    }
  };

  const handleCheckinSubmit = () => {
    //TODO: further logic for submitting the checkin
  };

  return (
    <>
      <main className="pt-[109px] px-[50px] flex flex-col items-center relative">
        <Progress
          value={(checkinStep / totalCheckinSteps) * 100}
          className="w-[33%] mb-8"
        />

        {renderCheckinStepComponent()}

        <div
          className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex gap-44"
          style={{ zIndex: 10 }}
        >
          <Button
            variant="arrow"
            onClick={previousCheckinStep} /* disabled={checkinStep === 1} */
          >
            <ArrowLeft />
          </Button>
          {checkinStep < totalCheckinSteps ? (
            <Button variant="arrow" onClick={nextCheckinStep}>
              <ArrowRight />
            </Button>
          ) : (
            <Button onClick={handleCheckinSubmit}>Speichern</Button>
          )}
        </div>
      </main>
    </>
  );
};

export default RecordPage;
