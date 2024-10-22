import { NavLink } from "react-router-dom";
// pages import:
import DashboardPage from "@/pages/DashboardPage";
import InfoPage from "@/pages/InfoPage";
import JournalPage from "@/pages/JournalPage";
import MetricsPage from "@/pages/MetricsPage";
import UserDataPage from "@/pages/UserDataPage";

// icon import:
import HomeIcon from "/src/assets/icons/home-4-svgrepo-com.svg";
import StatisticIcon from "/src/assets/icons/presentation-2-svgrepo-com.svg";
import JouranlIcon from "/src/assets/icons/diary-svgrepo-com.svg";
import InfoIcon from "/src/assets/icons/information-svgrepo-com.svg";
import LogoutIcon from "/src/assets/icons/walk-svgrepo-com.svg";
import ProfileImageIcon from "/src/components/ownComponents/navMenu/ProfileImageIcon.jsx";
import { useAuthContext } from "../../../utils/contexts/AuthProvider";

const baseURL = import.meta.env.VITE_baseURL;
const basePathOne = import.meta.env.VITE_basePathOne;

export const NavMenu = () => {
  const { setIsLoggedIn, setIsLoggedOut } = useAuthContext();

  // routes:
  const routes = [
    {
      id: 1,
      name: "Profil",
      icon: <ProfileImageIcon className="h-6 w-6" />,
      to: "/meineDaten",
      element: <UserDataPage />,
    },
    {
      id: 2,
      name: "Home",
      icon: <HomeIcon className="h-[23.393px] w-auto" />,
      to: "/dashboard",
      element: <DashboardPage />,
    },
    {
      id: 3,
      name: "Statistiken",
      icon: <StatisticIcon className="h-[23.393px] w-6" />,
      to: "/meineStatistiken",
      element: <MetricsPage />,
    },
    {
      id: 4,
      name: "Journal",
      icon: <JouranlIcon className="h-[23.393px] w-6 " />,
      to: "/meinJournal",
      element: <JournalPage />,
    },
    {
      id: 5,
      name: "Info",
      icon: <InfoIcon className="h-[23.393px] w-6" />,
      to: "/Info",
      element: <InfoPage />,
    },
  ];

  // logout
  const handleLogout = async () => {
    try {
      await fetch(`${baseURL}${basePathOne}/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      setIsLoggedOut(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // container nav-bar:
    <>
      {routes.map((route) => (
        // container nav-element
        <div key={route.id}>
          <NavLink
            to={route.to}
            className="w-[57px] h-[61px] items-center  px-[12px] flex justify-center gap-[7.798px] flex-shrink-0 aria-[current=page]:bg-white rounded-md" // hover nutzen? => hover:text-[#345995]
          >
            {/* container nav-link element */}
            <div className="flex flex-col select-none items-center justify-center rounded-sm px-3 py-1.5 outline-none text-[10px] ">
              {/* nav-icon */}
              {route.icon}
              {/* nav-title */}
              {route.name}
            </div>
          </NavLink>
        </div>
      ))}

      {/* container nav-element */}
      <div className="items-center">
        <NavLink
          to={"/"}
          onClick={handleLogout}
          className="w-[57px] h-[61px] items-center px-[12px] flex justify-center gap-[7.798px] flex-shrink-0 aria-[current=page]:bg-white rounded-md"
        >
          {/* container nav-link element */}
          <div className="flex flex-col select-none items-center rounded-sm px-3 py-1.5 outline-none text-[10px] ">
            {/* nav-icon */}
            <LogoutIcon className="h-[23.393px] w-6" />
            {/* nav-title */}
            <p>Logout</p>
          </div>
        </NavLink>
      </div>
    </>
  );
};
