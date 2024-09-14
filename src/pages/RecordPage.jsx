import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// arrow icons
import ArrowLeft from "/src/assets/icons/arrow-left-svgrepo-com.svg";
import ArrowRight from "/src/assets/icons/arrow-right-svgrepo-com.svg";
import SaveSymbol from "/src/assets/icons/save-2-svgrepo-com.svg";

// import subcomponents for the record page
import CheckInFeelingDisplay from "@/components/ownComponents/recordPage/CheckInFeelingDisplay.jsx";
import TagsPlaceTimePeople from "@/components/ownComponents/recordPage/TagsPlaceTimePeople.jsx";
import TagsContext from "@/components/ownComponents/recordPage/TagsContext.jsx";
import MakeANote from "@/components/ownComponents/recordPage/MakeANote.jsx";
import SleepActivityWeather from "@/components/ownComponents/recordPage/SleepActivityWeather.jsx";

// import EmotionsProvider
import { useEmotionsContext } from "@/utils/EmotionsProvider";
// import useRecordProgressProvider
import { useRecordProgressContext } from "@/utils/RecordProgressProvider";
// import TagProvider
import { useTagContext } from "@/utils/TagProvider";
// import CheckinProvider
import { useCheckinContext } from "@/utils/CheckinProvider";

const RecordPage = () => {
  const { feelingsFamilies, selectedFeeling } = useEmotionsContext();
  const { selectedTags } = useTagContext();
  const [selectedTagCaterogories, setSelectedTagCategories] = useState(null);

  // Context for Submitting the Check-In
  const { handleCheckinSubmit, isLoading, error } = useCheckinContext();

  // find the unique tag categories
  useEffect(() => {
    const findSelectedTagCaterogories = () => {
      const categories = selectedTags.reduce(
        (acc, curr) =>
          acc.includes(curr.category) ? acc : [...acc, curr.category],
        []
      );
      setSelectedTagCategories(categories);
    };
    findSelectedTagCaterogories();
  }, [selectedTags]);

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

  const onCheckinSubmit = async () => {
    try {
      await handleCheckinSubmit();
      console.log("Check-in successful");
      navigateBackToDashboard("/dashboard");
    } catch (error) {
      console.error("Error during check-in submission:", error);
    }
  };

  return (
    <main className="pt-[95px] px-[50px] flex flex-col items-center relative min-h-screen">
      <div className="flex-grow">{renderCheckinStepComponent()}</div>

      <Progress
        value={(checkinStep / totalCheckinSteps) * 100}
        className="w-[66%] mb-24 relative"
      />

      <div
        className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 flex gap-72"
        /* style={{ zIndex: 10 }} */
      >
        <Button
          variant="arrow"
          onClick={handleBackToDashboard} /* disabled={checkinStep === 1} */
        >
          <ArrowLeft />
        </Button>
        {checkinStep < totalCheckinSteps ? (
          <Button
            variant="arrow"
            onClick={nextCheckinStep}
            disabled={
              !selectedFeeling ||
              (checkinStep === 2 && selectedTagCaterogories.length < 3)
            }
          >
            <ArrowRight />
          </Button>
        ) : (
          <Button
            variant="arrow"
            onClick={onCheckinSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : <SaveSymbol />}
          </Button>
        )}
      </div>
    </main>
  );
};

export default RecordPage;
