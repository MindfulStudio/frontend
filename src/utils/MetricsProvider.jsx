import { createContext, useContext, useEffect, useState } from "react";
import defaultTags from "../data/standardTags.json";
import { useUserContext } from "./UserProvider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { Button } from "@/components/ui/button";
// import Delete from "/src/assets/icons/delete-2-svgrepo-com.svg";

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


  // StatisticTwo - defaultTags
  const [standardTags, setStandardTags] = useState(defaultTags);

  // -------------------------- States from UserProvider --------------------------

  const { customTags, setCustomTags, handleDeactivateCustom } =
    useUserContext();

  // ----------------------------------- Values---------------------------------
  // statisticOne
  const maxMetricsOneStatus = 2;

  // statisticTwo
  const maxMetricsTwoStatus = 2;

  // ----------------------------------- Function - fetch getAllCheckins---------------------------------

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

  // ----------------------------------- useEffect - check if >= 7 check-ins available ---------------------------------
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

  // ----------------------------------- Function - handle loadStaticsTwo ---------------------------------
  const handleLoadStatisitcsTwo = () => {
    try {
      if (metricsTwoStatus <= maxMetricsTwoStatus) {
        setMetricsTwoStatus((prevStat) => prevStat + 1);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // ----------------------------------- Function - handle selcting/deselecting tags ---------------------------------
  const handleTagToggle = (tag) => {
    setSelectTag((prevSelectedTag) => {
      // prevSelectedTag is the previous state of the selectedTag array

      const isSelected = prevSelectedTag?.name === tag.name; // check if the tag is already selected (it has been clicked before)...

      if (isSelected) {
        // if the tag is selected again it is deselected
        return null;
      } else {
        handleLoadStatisitcsTwo();
        return tag;
      }
    });
  };
  console.log({ selectedTag });

  // ----------------------------------- Function - render tags ---------------------------------

  // The renderTags function takes a category as a parameter (e.g. “when”, “where”) and searches the standardTags array to find the matching object with the desired category. As soon as the matching object has been found, it renders the singleStandardTags as li elements
  const renderTagListbyCategoryMetrics = (category) => {
    const categoryTags = standardTags.find((tag) => tag.category === category);
    const categoryTagsCustom = customTags[category];

    return categoryTags || categoryTagsCustom ? (
      <div>
        <ToggleGroup type="multiple" className="flex flex-wrap gap-3">
          {categoryTags.singleStandardTags.map((tag, index) => (
            <ToggleGroupItem
              key={index}
              value={tag}
              aria-label={tag}
              className={`cursor-pointer p-2 border`}
              data-state={selectedTag?.name === tag ? "on" : ""}
              onClick={() =>
                handleTagToggle({
                  name: tag,
                  isDefault: true,
                  category: category,
                })
              }
            >
              {tag}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ToggleGroup type="multiple" className="flex flex-wrap gap-3 mt-3">
          {categoryTagsCustom?.map((tag, index) => (
            <div key={index} className="flex items-center gap-1">
              <ToggleGroupItem
                key={index}
                value={tag.name}
                aria-label={tag.name}
                className={`cursor-pointer p-2 border `}
                data-state={selectedTag?.name === tag.name ? "on" : ""}
                onClick={() => handleTagToggle(tag)}
              >
                {tag.name}
              </ToggleGroupItem>
            </div>
          ))}
        </ToggleGroup>
      </div>
    ) : (
      // styling not yet fixed; for now, I´ve applied same styling as for the Tags
      <p>Keine Tags gefunden</p>
    );
  };

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
        showArrow,
        setShowArrow,
        renderTagListbyCategoryMetrics,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export default MetricsProvider;

export const useMetricsContext = () => useContext(MetricsContext);
