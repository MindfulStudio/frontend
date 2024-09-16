import { createContext, useContext, useEffect, useState } from "react";

const MetricsContext = createContext();

const MetricsProvider = ({ children }) => {
  // ----------------------------------- States---------------------------------

  const [metricsOneStatus, setMetricsOneStatus] = useState(1);

  // selected feelingsFamily
  const [selectedFeelingsFamily, setSelectedFeelingsFamily] = useState(null);

  // useState für Anzahl check-ins des Tages:
  // TODO: fehlt noch fetching
  const [checkIn, setCheckIn] = useState(7); // fake-State zum testen

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
    }
  }, []);

  return (
    <MetricsContext.Provider
      value={{
        metricsOneStatus,
        setMetricsOneStatus,
        maxMetricsOneStatus,
        selectedFeelingsFamily,
        setSelectedFeelingsFamily,
        checkIn,
        setCheckIn,
        showMetrics,
        setShowMetrics,
        previousMetricsOneStep
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export default MetricsProvider;

export const useMetricsContext = () => useContext(MetricsContext);
