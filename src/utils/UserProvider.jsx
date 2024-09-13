import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [customFeelings, setCustomFeelings] = useState([]);
  const [customTags, setCustomTags] = useState([]);
  const [sleepingHours, setSleepingHours] = useState("");

  const [checkinData, setCheckinData] = useState({
    emotion: {},
    tags: [],
    comment: "",
    config: {},
  });
  // Final structure of checkinData for POST-request (Example):
  // {
  //   emotion: { family: "Freude", name: "begeistert" },
  //   tags: [
  //     { category: "mitWem", name: "Hund", isDefault: false },
  //     { category: "wann", name: "morgens", isDefault: true },
  //   ],
  //   comment: "blabla",
  //   config: { sleepingHours: 7, physicalActivity: true, weather: "sonnig" },
  // };

  // ---------------------CUSTOMS: Fetching & preparation------------------------

  const transformCustoms = (customs) => {
    let transformed = {};
    customs.forEach((obj, index) => {
      let { isActive, isDefault, name } = obj;
      let group = obj.family || obj.category;
      let id = index + (obj.family ? 400 : 800); // id >400 for emotions, >800 for tags
      // If custom is active, push into the according array of its group:
      if (isActive) {
        if (!transformed[group]) {
          transformed[group] = [];
        }
        transformed[group].push({ id, name, isDefault, isActive });
      }
    });
    return transformed;
  };

  const fetchAllCustoms = async () => {
    // fetching all customs - GET:
    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const pathURL = import.meta.env.VITE_basePathThree;
      const response = await fetch(`${baseURL}${pathURL}customs`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      // In case of userNotFound error:
      if (!response.ok) {
        throw new Error(
          "Ein unerwarteter Fehler ist aufgetreten. Bitte neu einloggen."
        );
      }
      // Transform customs (for similarity with frontend data):
      const { emotions, tags } = data.data;
      const transformedEmotions = transformCustoms(emotions);
      const transformedTags = transformCustoms(tags);
      setCustomFeelings(transformedEmotions);
      setCustomTags(transformedTags);

      return;
    } catch (error) {
      // In case of any other server errors:
      console.log(error);
      console.log(error || "Ein unerwarteter Serverfehler ist aufgetreten.");
    }
  };

  // ---------------------CHECKIN: Preparation & Post------------------------

  return (
    <UserContext.Provider
      value={{
        customTags,
        setCustomTags,
        customFeelings,
        setCustomFeelings,
        fetchAllCustoms,
        checkinData,
        setCheckinData,
        sleepingHours,
        setSleepingHours,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
