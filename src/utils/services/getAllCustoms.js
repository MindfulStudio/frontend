import { transformCustoms } from "../helpers/transformCustoms";

export const getAllCustoms = async (setCustomFeelings, setCustomTags) => {
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
