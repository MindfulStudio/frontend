import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [customFeelings, setCustomFeelings] = useState([]);
  const [customTags, setCustomTags] = useState([]);

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

  // fetch customs from backend when the component is mounted:
  useEffect(() => {
    fetchAllCustoms();
  }, []);

  return (
    <UserContext.Provider
      value={{ customTags, setCustomTags, customFeelings, setCustomFeelings }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
