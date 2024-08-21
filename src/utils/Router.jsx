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
import StartPage from "../pages/StartPage";
import UserDataPage from "../pages/UserDataPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/configuration",
          element: <ConfigPage />,
        },
        {
          path: "/meineDaten",
          element: <UserDataPage />,
        },
        {
          path: "/start", // hier vielleicht später den App-Namen nutzen?
          element: <StartPage />,
        },
        {
          path: "/emotionalesWohlbefindenErfassen", // vielleicht auch noch einmal Namen ändern?
          element: <RecordPage />,
        },
        {
          path: "/meineStatistiken", //vllt. ohne meine?
          element: <MetricsPage />,
        },
        {
          path: "/meinGefühlstagebuch", //vllt. ohne meine?
          element: <JournalPage />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  );
};

export default Router;
