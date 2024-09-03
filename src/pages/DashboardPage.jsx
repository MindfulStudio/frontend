import FeelingsFamilyComponent from "@/components/ownComponents/dashboardPage/FeelingsFamilyComponent";
import GreetingComponent from "@/components/ownComponents/dashboardPage/GreetingComponent";

const DashboardPage = () => {
  return (
    // max-breite für main?
    <main className="pt-[109px] px-[50px] flex flex-col items-center"> 
      <GreetingComponent />
      <FeelingsFamilyComponent />
    </main>
  );
};

export default DashboardPage;
