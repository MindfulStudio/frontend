import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import ConfigPage from "../../pages/ConfigPage";
import ErrorPage from "../../pages/ErrorPage";
import HomePage from "../../pages/HomePage";
import JournalPage from "../../pages/JournalPage";
import LoginPage from "../../pages/LoginPage";
import MetricsPage from "../../pages/MetricsPage";
import RecordPage from "../../pages/RecordPage";
import RegisterPage from "../../pages/RegisterPage";
import DashboardPage from "../../pages/DashboardPage";
import UserDataPage from "../../pages/UserDataPage";
import InfoPage from "../../pages/InfoPage";
// Providers
import EmotionsProvider from "../contexts/EmotionsProvider";
import TagProvider from "../TagProvider";

import RecordProgressProvider from "../contexts/RecordProgressProvider";
import UserProvider from "../contexts/UserProvider";
import CheckinProvider from "../contexts/CheckinProvider";
import AuthProvider from "../contexts/AuthProvider";

import MetricsProvider from "../MetricsProvider";
import PrivateRoute from "./PrivateRoute";

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
          element: (
            <PrivateRoute>
              <RecordPage />
            </PrivateRoute>
          ),
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
          element: (
            <PrivateRoute>
              <ConfigPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/meineDaten",
          element: (
            <PrivateRoute>
              <UserDataPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          ),
        },
        /*  {
          path: "/emotionalesWohlbefindenErfassen", // vielleicht auch noch einmal Namen ändern?
          element: <RecordPage />,
        }, */
        {
          path: "/meineStatistiken",
          element: (
            <PrivateRoute>
              <MetricsPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/meinJournal",
          element: (
            <PrivateRoute>
              <JournalPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/Info",
          element: (
            <PrivateRoute>
              <InfoPage />
            </PrivateRoute>
          ),
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
