import { createContext, useContext, useEffect, useState } from "react";

const MetricsContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;
const basePathThree = import.meta.env.VITE_basePathThree;

const MetricsProvider = ({ children }) => {
  // ----------------------------------- States---------------------------------
 // statisticOne
  const [metricsOneStatus, setMetricsOneStatus] = useState(1);
   // statisticTwo
  const [metricsTwoStatus, setMetricsTwoStatus] = useState(1);
   // statisticTwo
  const [disableTag, setDisableTag] = useState(false);

  // selected feelingsFamily - statisticOne
  const [selectedFeelingsFamily, setSelectedFeelingsFamily] = useState(null);
  // select tag - statisticTwo:
  const [selectedTag, setSelectTag] = useState(null);

  // useState für Anzahl check-ins - statisticOne &  // statisticTWo
  const [checkIn, setCheckIn] = useState(0);

  // statistics by family - statisticOne
  const [statisticsByFamily, setStatisticsByFamily] = useState([]);
  // statistics by Tag - statisticTwo:
  const [statisticsByTag, setStatisticsByTag] = useState([]);

  // State zur Überprüfung, ob mehr als 7 check-ins vorhanden sind - CardDescription & CardContent wird entschrechend eingblendet
  // StatisticOne
  const [showMetricsOne, setShowMetricsOne] = useState(false);
  // StatisticTwo
  const [showMetricsTwo, setShowMetricsTwo] = useState(false);

  // show arrow to navigate back:
  const [showArrow, setShowArrow] = useState(false);


  // ----------------------------------- Values---------------------------------
  // statisticOne
  const maxMetricsOneStatus = 2;
   // statisticTwo
  const maxMetricsTwoStatus = 2;

   // ----------------------------------- Function -  fetch getAllCheckins---------------------------------

  // get total of check ins
  const getAllCheckins = async () => {
    try {
      const res = await fetch(`${baseURL}${basePathThree}checkins`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error fetching check-ins");
      const data = await res.json();
      setCheckIn(data.data.length);
    } catch (error) {
      console.error(error);
    }
  };

   // ----------------------------------- Function -  fetch getStatisticsByFamily ---------------------------------

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
      setStatisticsByFamily(data.data);
    } catch (error) {
      console.error(error);
    }
  };


  // ----------------------------------- Function -  fetch getStatisticsByTag ---------------------------------
  const getStatisticsByTag = async (tagName) => {
    const baseURL = import.meta.env.VITE_baseURL;
    const path = import.meta.env.VITE_basePathThree;
    try {
      const res = await fetch(`${baseURL}${path}stats/tag?tag=${tagName}`, {
        credentials: "include",
      });
      const data = await res.json();
      setStatisticsByTag(data.data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch function for fetching statistics by tag
  const fetchStatsByTag = async (tagName) => {
    const data = await getStatisticsByTag(tagName);
    if (data && data.data && data.data.stats) {
      console.log("data.data.stats:", data.data.stats); // debugging
      // TODO: transform the data to the format needed for the statistic
    }
  };

  // ----------------------------------- Function -  previous metrics status ---------------------------------

  // StatisticOne
  const previousMetricsOneStep = () => {
    if (metricsOneStatus > 1) {
      setMetricsOneStatus((prevStatus) => prevStatus - 1);
    }
  };

  // StatisticTwo
  const previousMetricsTwoStep = () => {
    if (metricsTwoStatus > 1) {
      setMetricsTwoStatus((prevStatus) => prevStatus - 1);
    }
  };

  // ----------------------------------- Function - check if >= 7 check-ins available ---------------------------------
  //  StatisticOne:
  useEffect(() => {
    if (Number(checkIn) >= 7) {
      setShowMetricsOne(true);
      // fetch is not necessary if there are less than 7 check-ins
      if (selectedFeelingsFamily) getStatisticsByFamily();
    }
  }, [selectedFeelingsFamily, checkIn]);

  // StatisticTwo:
  useEffect(() => {
    if (Number(checkIn) >= 7) {
      setShowMetricsTwo(true);
      // fetch is not necessary if there are less than 7 check-ins
      if (selectedTag) getStatisticsByTag();
    }
  }, [selectedTag, checkIn]);

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
        showMetricsOne,
        setShowMetricsOne,
        previousMetricsOneStep,
        fetchStatsByTag,
        maxMetricsTwoStatus,
        metricsTwoStatus,
        setMetricsTwoStatus,
        previousMetricsTwoStep,
        showMetricsTwo,
        setShowMetricsTwo,
        selectedTag,
        setSelectTag,
        statisticsByTag,
        setStatisticsByTag,
        showArrow, setShowArrow
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export default MetricsProvider;

export const useMetricsContext = () => useContext(MetricsContext);
