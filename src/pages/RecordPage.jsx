import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// --------------------------- Icon Component Imports ---------------------------
import ArrowLeft from "/src/assets/icons/arrow-left-svgrepo-com.svg";
import ArrowRight from "/src/assets/icons/arrow-right-svgrepo-com.svg";
import SaveSymbol from "/src/assets/icons/save-2-svgrepo-com.svg";
import SaveSymbolWhite from "/src/assets/icons/save-2-svgrepo-com-white.svg";
import LoadingSymbolWhite from "/src/assets/icons/upload-3-svgrepo-com.svg";
import Home from "/src/assets/icons/home-4-svgrepo-com.svg";

// --------------------------- Subcomponent Imports ---------------------------
import CheckInFeelingDisplay from "@/components/ownComponents/recordPage/CheckInFeelingDisplay.jsx";
import TagsPlaceTimePeople from "@/components/ownComponents/recordPage/TagsPlaceTimePeople.jsx";
import TagsContext from "@/components/ownComponents/recordPage/TagsContext.jsx";
import MakeANote from "@/components/ownComponents/recordPage/MakeANote.jsx";
import SleepActivityWeather from "@/components/ownComponents/recordPage/SleepActivityWeather.jsx";

// --------------------------- Context Imports ----------------------------------
import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useRecordProgressContext } from "@/utils/RecordProgressProvider";
import { useTagContext } from "@/utils/TagProvider";
import { useCheckinContext } from "@/utils/CheckinProvider";

const RecordPage = () => {
  // ------------------------------- States from Context ------------------------
  const { feelingsFamilies, selectedFeeling } = useEmotionsContext();
  const { selectedTags } = useTagContext();

  const { handleCheckinSubmit, isLoading, error, checkinData, setCheckinData } =
    useCheckinContext();
  const {
    checkinStep,
    totalCheckinSteps,
    nextCheckinStep,
    previousCheckinStep,
    resetCheckinStep,
  } = useRecordProgressContext();

  const navigateBackToDashboard = useNavigate();

  // ------------------------------- Local States -------------------------------
  const [selectedTagCategories, setSelectedTagCategories] = useState(null);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false); // to change the button color after submit

  // ------------------------------- Functions --------------------------------------------------------------------------

  // Function A) Render the correct component based on the current checkinStep:

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

  // Function B) Handle the navigation between the checkin steps:

  const handleBackToDashboard = () => {
    if (checkinStep === 1) {
      resetCheckinStep(); // reset the checkin step if the user goes back to the dashboard
      // if the user is on the first step, the left arrow can be used to navigate back to the dashboard
      navigateBackToDashboard("/dashboard");
    } else {
      previousCheckinStep(); // otherwise the user can navigate back to the previous step
    }
  };

  // Function C) Find selected TagCategories based on selected Tags by the user:
  // To check in the TagsPlaceTimePeople component if the user has selected at least 3 tags in each category

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

  // Function D) Handle the submission of the checkin:

  const onCheckinSubmit = async () => {
    setIsSubmitClicked(true);
    try {
      await handleCheckinSubmit();
      console.log("Check-in successful");
      resetCheckinStep(); // reset the checkin step after successful submission
      navigateBackToDashboard("/dashboard");
    } catch (error) {
      console.error("Error during check-in submission:", error);
    }
  };

  // Function E) Handle Cancel checkin process somewhere during the checkin:
  const handleCancelProcess = () => {
    resetCheckinStep(); // reset the checkin step if the user cancels the checkin
    // empty the checkinData object
    console.log(checkinData);
    navigateBackToDashboard("/dashboard"); // Leitet den Benutzer auf die Startseite weiter
  };

  // ------------------------------- Render -----------------------------------------------------
  return (
    <main className="pt-[95px] px-[50px] flex flex-col items-center justify-between min-h-screen">
      {/* Cancel Checkin on the top left */}
      <Button
        onClick={handleCancelProcess}
        className="absolute top-5 left-5 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label="Abbrechen und zurück zum Dashboard"
      >
        <Home className="w-6 h-6" />
      </Button>

      <div className="w-full max-w-4xl flex-grow flex flex-col">
        {/* Render the current Subcomponent based on the Progress: */}

        <div className="flex-grow relative">
          {renderCheckinStepComponent()}
          <div className="absolute inset-y-0 left-0 flex items-center -ml-7">
            {/* Arrow to the left */}
            <Button
              variant="arrow"
              onClick={handleBackToDashboard}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </div>

          {/* Arrow to the right */}
          <div className="absolute inset-y-0 right-0 flex items-center -mr-7">
            {checkinStep < totalCheckinSteps ? ( // if the user is not on the last step (5), the right arrow can be used to navigate to the next step
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
              /* changed the Submit Button Conditional Style Logic, due to confusing issue: reduced its handling to one state, not to two anymore */
              <Button
                variant="arrow"
                onClick={onCheckinSubmit}
                disabled={isLoading}
                className={`p-2 rounded-full ${
                  isLoading ? "bg-black" : "bg-gray-200 hover:bg-black"
                } disabled:cursor-not-allowed transition-colors duration-200 group`}
                /* Fixed Issue: The "group" class is a special utility class in Tailwind CSS that styles an element based on the state of its parent. It's useful for creating hover effects that affect child elements when the parent is hovered over. */
              >
                {isLoading ? ( // if the data is loading, show the loading symbol
                  <LoadingSymbolWhite className="w-6 h-6" />
                ) : (
                  <>
                    <SaveSymbol className="w-6 h-6 group-hover:hidden" />{" "}
                    {/* if the data is not loading, show the save symbol */}
                    <SaveSymbolWhite className="w-6 h-6 hidden group-hover:block" />{" "}
                    {/* if the data is not loading, show the save symbol */}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex flex-col items-center mb-24">
          <div className="w-[66%] max-w-[390px]">
            <Progress
              value={(checkinStep / totalCheckinSteps) * 100}
              className="w-full mb-4"
            />
            <div className="text-center text-sm text-gray-500">
              Schritt {checkinStep} von {totalCheckinSteps}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecordPage;
