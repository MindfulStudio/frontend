import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // States for customs:
  const [customFeelings, setCustomFeelings] = useState([]);
  const [customTags, setCustomTags] = useState([]);
  const [config, setConfig] = useState({});

  // ---------------------USERDATA: Fetching (for Config)------------------------

  const fetchConfigData = async () => {
    const baseURL = import.meta.env.VITE_baseURL;
    const pathURL = import.meta.env.VITE_basePathTwo;
    try {
      const response = await fetch(`${baseURL}${pathURL}`, {
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
      setConfig(data.data.config);
      return data.data.config;
    } catch (error) {
      // In case of any other server errors:
      console.log(error || "Ein unerwarteter Serverfehler ist aufgetreten.");
    }
  };

  // ---------------------CUSTOMS: Fetching & preparation------------------------

  const transformCustoms = (customs) => {
    let transformed = {};
    customs.forEach((obj, index) => {
      let { isActive, isDefault, name, family, category } = obj;
      let group = family || category;
      let id = index + (family ? 400 : 800); // id >400 for emotions, >800 for tags
      // If custom is active, push into the according array of its group:
      if (isActive) {
        if (!transformed[group]) {
          transformed[group] = [];
        }
        let item = { id, name, isDefault, isActive };
        if (family) item.family = family;
        if (category) item.category = category;
        transformed[group].push(item);
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
      console.log(error || "Ein unerwarteter Serverfehler ist aufgetreten.");
    }
  };

  // ---------------------CUSTOMS: Deactivate------------------------

  const handleDeactivateCustom = async (name, type) => {
    const baseURL = import.meta.env.VITE_baseURL;
    const pathURL = import.meta.env.VITE_basePathThree;
    try {
      const res = await fetch(`${baseURL}${pathURL}customs`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type }),
        credentials: "include",
      });

      // In case of error:
      if (!res.ok) {
        throw new Error(
          "Ein unerwarteter Fehler ist aufgetreten. Deaktivierung nicht möglich."
        );
      }
      // Fetch all customs again to update the state:
      fetchAllCustoms();
      return;
    } catch (error) {
      // In case of any other server errors:
      console.log(error || "Ein unerwarteter Serverfehler ist aufgetreten.");
    }
  };

  return (
    <UserContext.Provider
      value={{
        customTags,
        setCustomTags,
        customFeelings,
        setCustomFeelings,
        config,
        fetchAllCustoms,
        fetchConfigData,
        handleDeactivateCustom,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
