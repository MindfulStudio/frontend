import { useEffect } from "react";

// --------------------------- Context Imports ----------------------------------
import { useUserContext } from "@/utils/UserProvider";
import { useCheckinContext } from "@/utils/CheckinProvider";

// --------------------------- Component Imports ----------------------------------
import FeelingsFamilyComponent from "@/components/ownComponents/dashboardPage/FeelingsFamilyComponent";
import GreetingComponent from "@/components/ownComponents/dashboardPage/GreetingComponent";
import UserFeedbackText from "@/components/typo/UserFeedbackText";

const DashboardPage = () => {
  // ------------------------------- States from Contexts -----------------------
  const { fetchAllCustoms } = useUserContext();
  const { setCheckinUserFeedback, checkinUserFeedback } = useCheckinContext(); // checkinUserFeedback depends on the success of a previous checkin

  // ------------------------------- Fetching customs ---------------------------
  useEffect(() => {
    fetchAllCustoms();
  }, [fetchAllCustoms]);

  // -------------------------  Timer to clear userfeedback ---------------------
  useEffect(() => {
    if (checkinUserFeedback.message) {
      const timer = setTimeout(
        () => setCheckinUserFeedback({ message: "", type: "" }),
        3000
      ); // 4 seconds
      return () => clearTimeout(timer); // Cleanup
    }
  }, [checkinUserFeedback]);

  // ------------------------------- Render -------------------------------------
  return (
    <div className="flex flex-col justify-center">
      {/* User feedback */}
      {checkinUserFeedback.message && (
        <div className="fixed inset-0 flex justify-center items-start z-50 mt-5 pointer-events-none">
          <UserFeedbackText
            content={checkinUserFeedback.message}
            type={checkinUserFeedback.type}
            className="w-[290px] text-center bg-white shadow-lg p-4 rounded"
          />
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow pt-[109px] px-[50px] flex flex-col items-center">
        <GreetingComponent />
        <FeelingsFamilyComponent />
      </main>
    </div>
  );
};

export default DashboardPage;
