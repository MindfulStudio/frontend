import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

// arrow icons
import ArrowLeft from "/src/assets/icons/arrow-left-svgrepo-com.svg";
import ArrowRight from "/src/assets/icons/arrow-right-svgrepo-com.svg";

// import subcomponents for the record page
import CheckInFeelingDisplay from "@/components/ownComponents/recordPage/CheckInFeelingDisplay.jsx";
import TagsPlaceTimePeople from "@/components/ownComponents/recordPage/TagsPlaceTimePeople.jsx";
import TagsContext from "@/components/ownComponents/recordPage/TagsContext.jsx";
import MakeANote from "@/components/ownComponents/recordPage/MakeANote.jsx";
import SleepActivityWeather from "@/components/ownComponents/recordPage/SleepActivityWeather.jsx";

// import EmotionsProvider
import { useEmotionsContext } from "@/utils/EmotionsProvider";
// import useRecordProgressContext
import { useRecordProgressContext } from "@/utils/RecordProgressProvider";

const RecordPage = () => {
  const { feelingsFamilies } = useEmotionsContext();

  const {
    checkinStep,
    totalCheckinSteps,
    nextCheckinStep,
    previousCheckinStep,
  } = useRecordProgressContext();

  const navigateBackToDashboard = useNavigate();

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

  const handleBackToDashboard = () => {
    if (checkinStep === 1) {
      navigateBackToDashboard("/dashboard");
      // the user can only redirect to the dashboard page in the first step, otherwise the previous logic remains the same.
    } else {
      previousCheckinStep();
    }
  };

  const handleCheckinSubmit = () => {
    //TODO: further logic for submitting the checkin
  };

  return (
    <main className="pt-[95px] px-[50px] flex flex-col items-center relative">
      {renderCheckinStepComponent()}

      <Progress
        value={(checkinStep / totalCheckinSteps) * 100}
        className="w-[66%] mt-10 relative"
      />

      <div
        className="absolute bottom-96 left-1/2 transform -translate-x-1/2 flex gap-72"
        style={{ zIndex: 10 }}
      >
        <Button
          variant="arrow"
          onClick={handleBackToDashboard} /* disabled={checkinStep === 1} */
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
  );
};

export default RecordPage;
