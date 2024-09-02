import { createContext, useContext } from "react";

export const EmotionsContext = createContext();

const EmotionsProvider = ({ children }) => {
  return (
    <EmotionsContext.Provider value={{}}>{children}</EmotionsContext.Provider>
  );
};

export default EmotionsProvider;
export const useEmotionsContext = () => useContext(EmotionsContext);
