import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ConfigPage from "../pages/ConfigPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import JournalPage from "../pages/JournalPage";
import LoginPage from "../pages/LoginPage";
import MetricsPage from "../pages/MetricsPage";
import RecordPage from "../pages/RecordPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import UserDataPage from "../pages/UserDataPage";
import InfoPage from "../pages/InfoPage";
// Providers
import EmotionsProvider from "./EmotionsProvider";
import TagProvider from "./TagProvider";
import RecordProgressProvider from "./RecordProgressProvider";
import UserProvider from "./UserProvider";
import AuthProvider from "./AuthProvider";

import CheckinProvider from "./CheckinProvider";

import MetricsProvider from "./MetricsProvider";

const Router = () => {
  const router = createBrowserRouter([
    // pages without layout (navBar)
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/anmeldung",
          element: <LoginPage />,
        },
        {
          path: "/registrierung",
          element: <RegisterPage />,
        },
        {
          path: "/recordfeeling",
          element: <RecordPage />,
        },
      ],
    },
    // pages with layout (navBar)
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/anmeldung",
          element: <LoginPage />,
        },
        {
          path: "/registrierung",
          element: <RegisterPage />,
        },
        {
          path: "/konfiguration",
          element: <ConfigPage />,
        },
        {
          path: "/meineDaten",
          element: <UserDataPage />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        /*  {
          path: "/emotionalesWohlbefindenErfassen", // vielleicht auch noch einmal Namen ändern?
          element: <RecordPage />,
        }, */
        {
          path: "/meineStatistiken",
          element: <MetricsPage />,
        },
        {
          path: "/meinJournal",
          element: <JournalPage />,
        },
        {
          path: "/Info",
          element: <InfoPage />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
    <UserProvider>
      <EmotionsProvider>
        <TagProvider>
          <RecordProgressProvider>
            <CheckinProvider>
              <MetricsProvider>
                <RouterProvider router={router}>
                  <Layout />
                </RouterProvider>
              </MetricsProvider>
            </CheckinProvider>
          </RecordProgressProvider>
        </TagProvider>
      </EmotionsProvider>
    </UserProvider>
</AuthProvider>

  );
};

export default Router;
