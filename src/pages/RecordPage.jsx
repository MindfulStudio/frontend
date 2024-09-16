import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowLeft from "/src/assets/icons/arrow-left-svgrepo-com.svg";
import ArrowRight from "/src/assets/icons/arrow-right-svgrepo-com.svg";
import SaveSymbol from "/src/assets/icons/save-2-svgrepo-com.svg";
import SaveSymbolWhite from "/src/assets/icons/save-2-svgrepo-com-white.svg";
import LoadingSymbolWhite from "/src/assets/icons/upload-3-svgrepo-com.svg";

import CheckInFeelingDisplay from "@/components/ownComponents/recordPage/CheckInFeelingDisplay.jsx";
import TagsPlaceTimePeople from "@/components/ownComponents/recordPage/TagsPlaceTimePeople.jsx";
import TagsContext from "@/components/ownComponents/recordPage/TagsContext.jsx";
import MakeANote from "@/components/ownComponents/recordPage/MakeANote.jsx";
import SleepActivityWeather from "@/components/ownComponents/recordPage/SleepActivityWeather.jsx";

import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useRecordProgressContext } from "@/utils/RecordProgressProvider";
import { useTagContext } from "@/utils/TagProvider";
import { useCheckinContext } from "@/utils/CheckinProvider";

const RecordPage = () => {
  const { feelingsFamilies, selectedFeeling } = useEmotionsContext();
  const { selectedTags } = useTagContext();
  const [selectedTagCategories, setSelectedTagCategories] = useState(null);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false); // to change the button color after submit

  const { handleCheckinSubmit, isLoading, error } = useCheckinContext();
  const {
    checkinStep,
    totalCheckinSteps,
    nextCheckinStep,
    previousCheckinStep,
  } = useRecordProgressContext();
  const navigateBackToDashboard = useNavigate();

  useEffect(() => {
    const findSelectedTagCategories = () => {
      const categories = selectedTags.reduce(
        (acc, curr) =>
          acc.includes(curr.category) ? acc : [...acc, curr.category],
        []
      );
      setSelectedTagCategories(categories);
    };
    findSelectedTagCategories();
  }, [selectedTags]);

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
    } else {
      previousCheckinStep();
    }
  };

  const onCheckinSubmit = async () => {
    setIsSubmitClicked(true);
    try {
      await handleCheckinSubmit();
      console.log("Check-in successful");
      navigateBackToDashboard("/dashboard");
    } catch (error) {
      console.error("Error during check-in submission:", error);
    }
  };

  return (
    <main className="pt-[95px] px-[50px] flex flex-col items-center justify-between min-h-screen">
      <div className="w-full max-w-4xl flex-grow flex flex-col">
        <div className="flex-grow relative">
          {renderCheckinStepComponent()}
          <div className="absolute inset-y-0 left-0 flex items-center -ml-7">
            <Button
              variant="arrow"
              onClick={handleBackToDashboard}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center -mr-7">
            {checkinStep < totalCheckinSteps ? (
              <Button
                variant="arrow"
                onClick={nextCheckinStep}
                disabled={
                  !selectedFeeling ||
                  (checkinStep === 2 && selectedTagCategories.length < 3)
                }
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            ) : (
              <Button
                variant="arrow"
                onClick={onCheckinSubmit}
                disabled={isLoading}
                className={`p-2 rounded-full ${
                  isSubmitClicked || isLoading
                    ? "bg-black"
                    : "bg-gray-200 hover:bg-black"
                } disabled:cursor-not-allowed transition-colors duration-200`}
              >
                {isLoading ? (
                  <LoadingSymbolWhite className="w-6 h-6" />
                ) : isSubmitClicked ? (
                  <SaveSymbolWhite className="w-6 h-6" />
                ) : (
                  <SaveSymbol className="w-6 h-6" />
                )}
              </Button>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-center mb-24">
          <div className="w-[66%] max-w-[390px]">
            <Progress
              value={(checkinStep / totalCheckinSteps) * 100}
              className="w-full mb-4"
            />
            <div className="text-center text-sm text-gray-500">
              Step {checkinStep} of {totalCheckinSteps}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecordPage;
