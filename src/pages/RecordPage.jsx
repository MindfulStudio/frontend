import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// --------------------------- Icon Component Imports -------------------------
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

// --------------------------- Shadcn Component Imports ------------------------
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// --------------------------- Context Imports ----------------------------------
import { useEmotionsContext } from "@/utils/contexts/EmotionsProvider";
import { useRecordProgressContext } from "@/utils/contexts/RecordProgressProvider";
import { useTagContext } from "@/utils/contexts/TagProvider";
import { useCheckinContext } from "@/utils/contexts/CheckinProvider";
import { useUserContext } from "../utils/contexts/UserProvider";

const RecordPage = () => {
  // -------------------------------For Navigation ------------------------------
  const navigateBackToDashboard = useNavigate();

  // ------------------------------- States from Contexts -----------------------
  const { loadConfigData } = useUserContext();

  const { feelingsFamilies, selectedFeeling } = useEmotionsContext();

  const { selectedTags } = useTagContext();
  const { handleCheckinSubmit, isLoading, checkinData, setSleepingHours } =
    useCheckinContext();

  const {
    checkinStep,
    totalCheckinSteps,
    setTotalCheckinSteps,
    nextCheckinStep,
    previousCheckinStep,
    resetCheckinStep,
  } = useRecordProgressContext();

  // ------------------------------- Local States -------------------------------
  const [selectedTagCategories, setSelectedTagCategories] = useState(null);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  // --------------------------- Fetching & setting config ----------------------
  useEffect(() => {
    const getConfig = async () => {
      try {
        const configData = await loadConfigData();
        const { sleepingHours, physicalActivity, weather } = configData;
        if (configData && !sleepingHours && !physicalActivity && !weather) {
          setTotalCheckinSteps(4);
          setSleepingHours(null);
        } else setTotalCheckinSteps(5);
      } catch (error) {
        console.error("Error fetching config data:", error);
      }
    };
    getConfig();
  }, []);

  // --------------------------------- Functions ----------------------------------

  //! Function A) Render the correct subcomponent based on the current checkinStep:

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

  //! Function B) Handle the navigation between the checkin steps:

  const handleBackToDashboard = () => {
    if (checkinStep === 1) {
      //! in this case, the user can navigate back to the dashboard
      resetCheckinStep();
      navigateBackToDashboard("/dashboard");
    } else {
      previousCheckinStep(); // other cases: back button navigates to the previous step
    }
  };

  //! Function C) Find selected Tagcategories based on selected Tags by the user

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

  //! Function D) Handle checkin submission:

  const onCheckinSubmit = async () => {
    setIsSubmitClicked(true);
    try {
      await handleCheckinSubmit();
      resetCheckinStep(); //! reset the checkin step after successful submission
      navigateBackToDashboard("/dashboard");
    } catch (error) {
      console.error("Error during check-in submission:", error);
    }
  };

  //! Function E) Handle cancel checkin process during the checkin:
  const handleCancelProcess = () => {
    resetCheckinStep(); //! reset the checkin step if the user cancels the checkin
    // console.log(checkinData); // for debugging: empty the checkinData object
    navigateBackToDashboard("/dashboard");
  };

  // ------------------------------- Render -----------------------------------------
  return (
    <main className="pt-[95px] px-[50px] flex flex-col items-center justify-between min-h-screen">
      {/* Cancel Checkin Button on the top left */}
      <Button
        onClick={handleCancelProcess}
        className="absolute top-5 left-5 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label="Abbrechen und zurück zum Dashboard"
      >
        <Home className="w-6 h-6" />
      </Button>

      <div className="w-full max-w-4xl flex-grow flex flex-col">
        {/* Render the current subcomponent based on the progress: */}
        <div className="flex-grow relative">
          {renderCheckinStepComponent()}
          <div className="absolute inset-y-0 left-0 flex items-center -ml-7">
            {/* Arrow to the left (back) */}
            <Button
              variant="arrow"
              onClick={handleBackToDashboard}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </div>

          {/* Arrow to the right (next) */}
          <div className="absolute inset-y-0 right-0 flex items-center -mr-7">
            {checkinStep < totalCheckinSteps ? ( //! if not last step (5), the right arrow can be used to navigate to the next step, otherwise the submit button is displayed
              <Button
                variant="arrow"
                onClick={nextCheckinStep}
                disabled={
                  !selectedFeeling ||
                  (checkinStep === 2 && selectedTagCategories.length < 3) //! if user has not selected at least 3 tag categories in step 2, the next button is disabled
                }
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            ) : (
              <Button
                variant="arrow"
                onClick={onCheckinSubmit}
                disabled={isLoading} //! disable btn when sending data
                className={`p-2 rounded-full ${
                  isLoading ? "bg-black" : "bg-gray-200 hover:bg-black"
                } disabled:cursor-not-allowed transition-colors duration-200 group`}
              >
                {isLoading ? (
                  <LoadingSymbolWhite className="w-6 h-6" />
                ) : (
                  <>
                    <SaveSymbol className="w-6 h-6 group-hover:hidden" />{" "}
                    {/* !show black icon when not hovering */}
                    <SaveSymbolWhite className="w-6 h-6 hidden group-hover:block" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex flex-col items-center mb-16">
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
