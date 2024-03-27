import { getApi } from "../utils/api/api";

export const data = async () => {
  try {
    const response = await getApi.get("MobileDemand");

    return response.data;
    // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
export const userData = async (userid) => {
  try {
    console.log(userid);
    const response = await getApi.get(`/MobileDemand/${userid}`); // Adjust the URL as per your API endpoint
    console.log("here");
    console.log(response);
    return response.data;
    // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
