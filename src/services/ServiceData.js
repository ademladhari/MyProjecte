import { getApi } from "../utils/api/api";

export const data = async () => {
  try {
    const response = await getApi.get("testing");

    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
