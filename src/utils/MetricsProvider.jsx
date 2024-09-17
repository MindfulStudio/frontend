import { createContext, useContext, useEffect, useState } from "react";

const MetricsContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;
const basePathThree = import.meta.env.VITE_basePathThree;

const MetricsProvider = ({ children }) => {
  // ----------------------------------- States---------------------------------

  const [metricsOneStatus, setMetricsOneStatus] = useState(1);

  // selected feelingsFamily
  const [selectedFeelingsFamily, setSelectedFeelingsFamily] = useState(null);

  // useState für Anzahl check-ins
  const [checkIn, setCheckIn] = useState(0);

  // statistics by family
  const [statisticsByFamily, setStatisticsByFamily] = useState([]);

  // get total of check ins
  const getAllCheckins = async () => {
    try {
      const res = await fetch(`${baseURL}${basePathThree}checkins`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error fetching check-ins");
      const data = await res.json();
      setCheckIn(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  // get statistics by emotion family
  const getStatisticsByFamily = async () => {
    try {
      const res = await fetch(
        `${baseURL}${basePathThree}stats/family/?family=${selectedFeelingsFamily}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Error fetching statistics by family");
      const data = await res.json();
      setStatisticsByFamily(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Funktion/State zur Überprüfung, ob mehr als 7 check-ins vorhanden sind - CardDescription & CardContent wird entschrechend eingblendet
  const [showMetrics, setShowMetrics] = useState(false);

  // ----------------------------------- Values---------------------------------
  const maxMetricsOneStatus = 2;

  // ----------------------------------- Function -  previous metrics status ---------------------------------

  const previousMetricsOneStep = () => {
    if (metricsOneStatus > 1) {
      setMetricsOneStatus((prevStatus) => prevStatus - 1);
    }
  };

  // ----------------------------------- Function - check if >= 7 check-ins available ---------------------------------
  useEffect(() => {
    if (Number(checkIn) >= 7) {
      setShowMetrics(true);
      // fetch is not necessary if there are less than 7 check-ins
      if (selectedFeelingsFamily) getStatisticsByFamily();
    }
  }, [selectedFeelingsFamily, checkIn]);

  return (
    <MetricsContext.Provider
      value={{
        getAllCheckins,
        metricsOneStatus,
        setMetricsOneStatus,
        maxMetricsOneStatus,
        selectedFeelingsFamily,
        setSelectedFeelingsFamily,
        statisticsByFamily,
        setStatisticsByFamily,
        checkIn,
        setCheckIn,
        showMetrics,
        setShowMetrics,
        previousMetricsOneStep,
      }}>
      {children}
    </MetricsContext.Provider>
  );
};

export default MetricsProvider;

export const useMetricsContext = () => useContext(MetricsContext);
