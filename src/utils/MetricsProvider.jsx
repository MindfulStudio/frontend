import { createContext, useContext, useEffect, useState } from "react";
import defaultTags from "../data/standardTags.json";
import { useUserContext } from "./contexts/UserProvider";

//-----------
import { getAllCheckins } from "./services/getAllCheckins";
import { getStatisticsByFamily } from "./services/getStatisticsByFamily";
import { getStatisticsByTag } from "./services/getStatisticsByTag";
import { renderTagListbyCategoryMetrics } from "./helpers/renderTagListbyCategoryMetrics";
import { handleTagToggleMetric } from "./helpers/handleTagToggleMetric";

const MetricsContext = createContext();

const MetricsProvider = ({ children }) => {
  // ----------------------------------- States---------------------------------

  // statisticOne
  const [metricsOneStatus, setMetricsOneStatus] = useState(1);
  // statisticTwo
  const [metricsTwoStatus, setMetricsTwoStatus] = useState(1);
  // statisticTwo

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

  // StatisticTwo - defaultTags
  const [standardTags, setStandardTags] = useState(defaultTags);

  // -------------------------- States from UserProvider --------------------------

  const { customTags } = useUserContext();

  // ----------------------------------- Values---------------------------------
  // statisticOne
  const maxMetricsOneStatus = 2;
  // statisticTwo
  const maxMetricsTwoStatus = 2;

  // ----------------------------------- Function - fetch getAllCheckins---------------------------------
  // get total of check ins
  const loadCheckinsTotal = async () => {
    try {
      await getAllCheckins(setCheckIn);
    } catch (error) {
      console.error("Fehler beim Abrufen der Anzahl der check-ins:", error);
    }
  };

  // ----------------------------------- Function -  fetch getStatisticsByFamily ---------------------------------

  // get statistics by emotion family
  const loadStatisticsByFamily = async () => {
    try {
      await getStatisticsByFamily(
        setStatisticsByFamily,
        selectedFeelingsFamily
      );
    } catch (error) {
      console.error("Fehler beim Abrufen der Statistiken:", error);
    }
  };

  // ----------------------------------- Function -  fetch getStatisticsByTag ---------------------------------
  const loadStatisticsByTag = async (tagName) => {
    try {
      await getStatisticsByTag(tagName, setStatisticsByTag);
    } catch (error) {
      console.error("Fehler beim Abrufen der Statistiken:", error);
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

  // ----------------------------------- useEffect - check if >= 7 check-ins available ---------------------------------
  //  StatisticOne:
  useEffect(() => {
    if (Number(checkIn) >= 1) {
      setShowMetricsOne(true);
      // fetch is not necessary if there are less than 1 check-ins
      if (selectedFeelingsFamily) loadStatisticsByFamily();
    }
  }, [selectedFeelingsFamily, checkIn]);

  // StatisticTwo:
  useEffect(() => {
    if (Number(checkIn) >= 1) {
      setShowMetricsTwo(true);
      // fetch is not necessary if there are less than 1 check-ins
      if (selectedTag) loadStatisticsByTag();
    }
  }, [selectedTag, checkIn]);

  // ----------------------------------- Function - handle loadStaticsTwo ---------------------------------
  const handleLoadStatisitcsTwo = () => {
    try {
      if (metricsTwoStatus <= maxMetricsTwoStatus) {
        setMetricsTwoStatus((prevStat) => prevStat + 1);
      }
    } catch (error) {
      console.log("error loading statistics2: ", error);
    }
  };

  // ----------------------------------- Function - handle selcting/deselecting tags ---------------------------------
  const selectTag = (tag) =>
    handleTagToggleMetric(tag, setSelectTag, handleLoadStatisitcsTwo);

  // ----------------------------------- Function - render tags ---------------------------------

  // The renderTags function takes a category as a parameter (e.g. “when”, “where”) and searches the standardTags array to find the matching object with the desired category. As soon as the matching object has been found, it renders the singleStandardTags as li elements
  const renderTagList = (category) =>
    renderTagListbyCategoryMetrics(
      category,
      standardTags,
      customTags,
      selectedTag,
      selectTag
    );

  return (
    <MetricsContext.Provider
      value={{
        loadCheckinsTotal,
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
        loadStatisticsByTag,
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
        showArrow,
        setShowArrow,
        renderTagList,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export default MetricsProvider;

export const useMetricsContext = () => useContext(MetricsContext);
