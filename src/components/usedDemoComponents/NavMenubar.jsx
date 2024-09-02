import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { NavLink } from "react-router-dom";
// import pages
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

export const NavMenubar = () => {
  // routes:
  const routes = [
    {
      id: 1,
      name: "profilImg",
      icon: <InfoIcon className="h-[23.393px] w-auto" />, // muss noch angepasst werden!
      to: "/meineDaten",
      element: <UserDataPage />,
    },
    {
      id: 2,
      name: "home",
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
      icon: <JouranlIcon className="h-[23.393px] w-6" />,
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
  const handleLogout = async () => {}; // muss noch implementiert werden

  return (
    <Menubar className="border-none w-[393px] justify-center">
      {routes.map((route) => (
        <MenubarMenu key={route.id}>
          <NavLink to={route.to} className="w-[57px] h-[61px] items-center ">
            <MenubarTrigger className="flex flex-col text-[9.357px] items-center">
              {route.icon}
              {route.name}
            </MenubarTrigger>
          </NavLink>
        </MenubarMenu>
      ))}

      {/* Wo soll es bei Lougout final hingehen? */}
      <MenubarMenu className="items-center w-[57px] h-[61px]">
        <NavLink to={"/"} onClick={handleLogout} className="w-[57px] h-[61px]">
          {/* handle logout muss noch richtig implementiert werden */}
          <MenubarTrigger className="flex flex-col text-[9.357px]">
            <LogoutIcon className="h-[23.393px] w-6" />
            Logout
          </MenubarTrigger>
        </NavLink>
      </MenubarMenu>
    </Menubar>
  );
};
