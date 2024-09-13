import FeelingsFamilyComponent from "@/components/ownComponents/dashboardPage/FeelingsFamilyComponent";
import GreetingComponent from "@/components/ownComponents/dashboardPage/GreetingComponent";
import { useUserContext } from "@/utils/UserProvider";
import { useEffect } from "react";

const DashboardPage = () => {
  const { fetchAllCustoms } = useUserContext();

  // fetch customs from backend when the component is mounted:
  useEffect(() => {
    fetchAllCustoms();
  }, [fetchAllCustoms]);

  return (
    // max-breite für main?
    <main className="pt-[109px] px-[50px] flex flex-col items-center">
      <GreetingComponent />
      <FeelingsFamilyComponent />
    </main>
  );
};

export default DashboardPage;
