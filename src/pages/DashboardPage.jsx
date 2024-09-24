import { useEffect } from "react";

// --------------------------- Context Imports ----------------------------------
import { useUserContext } from "@/utils/UserProvider";
import { useCheckinContext } from "@/utils/CheckinProvider";

// --------------------------- Component Imports ----------------------------------
import FeelingsFamilyComponent from "@/components/ownComponents/dashboardPage/FeelingsFamilyComponent";
import GreetingComponent from "@/components/ownComponents/dashboardPage/GreetingComponent";
import UserFeedbackText from "@/components/typo/UserFeedbackText";

const DashboardPage = () => {
  const { fetchAllCustoms } = useUserContext();
  const { setCheckinUserFeedback, checkinUserFeedback } = useCheckinContext(); // checkinUserFeedback depends on the success of a previous checkin

  // fetch customs from backend when the component is mounted:
  useEffect(() => {
    fetchAllCustoms();
  }, [fetchAllCustoms]);

  // Timer to clear userfeedback after a few seconds
  useEffect(() => {
    if (checkinUserFeedback.message) {
      const timer = setTimeout(
        () => setCheckinUserFeedback({ message: "", type: "" }),
        10000
      ); // 6 seconds
      return () => clearTimeout(timer); // Cleanup
    }
  }, [checkinUserFeedback]);

  return (
    <div className="flex flex-col min-h-screen justify-center">
      {checkinUserFeedback.message && (
        <div className="fixed inset-0 flex justify-center items-start z-50 mt-5">
          <UserFeedbackText
            content={checkinUserFeedback.message}
            type={checkinUserFeedback.type}
            className="w-[290px] text-center bg-white shadow-lg p-4 rounded"
          />
        </div>
      )}

      <main className="flex-grow pt-[109px] px-[50px] flex flex-col items-center">
        <GreetingComponent />
        <FeelingsFamilyComponent />
      </main>
    </div>
  );
};

export default DashboardPage;
