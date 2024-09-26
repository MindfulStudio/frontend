import { createContext, useContext, useState } from "react";
import { getConfigData } from "../services/getConfigData";
import { getAllCustoms } from "../services/getAllCustoms";
import { deactivateCustom } from "../services/deactivateCustom";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  // States for customs:
  const [customFeelings, setCustomFeelings] = useState([]);
  const [customTags, setCustomTags] = useState([]);
  const [config, setConfig] = useState({});

  // ---------------------USERDATA: Fetching (for Config)------------------------

  const loadConfigData = async () => {
    try {
      const config = await getConfigData(setConfig);
      return config;
    } catch (error) {
      console.error("Fehler beim Abrufen der Konfigurationsdaten:", error);
      return error;
    }
  };

  // ---------------------CUSTOMS: Fetching ------------------------
  const loadAllCustoms = async () => {
    try {
      await getAllCustoms(setCustomFeelings, setCustomTags);
    } catch (error) {
      console.error("Fehler beim Abrufen der customs:", error);
    }
  };

  // ---------------------CUSTOMS: Deactivate------------------------

  const handleDeactivateCustom = async (name, type) => {
    try {
      await deactivateCustom(name, type);
      await loadAllCustoms();
    } catch (error) {
      console.error("Deaktivieren des custom items fehlgeschlagen", error);
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
        loadAllCustoms,
        loadConfigData,
        handleDeactivateCustom,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
