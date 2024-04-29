import { getApi } from "../utils/api/api";

export const data = async (page) => {
  try {
    const response = await getApi.get("MobileDemand", {
      params: {
        page: page, // Start with page 1
        // Add any other query parameters as needed
        // Example:
        // sort: "desc", // Sorting order
        // includeAssigned: true // Whether to include assigned items
      },
    });

    return response.data;
    // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
export const userData = async (userid) => {
  try {
    const response = await getApi.get(`/MobileDemand/${userid}`);
    console.log("res", response.data); // Adjust the URL as per your API endpoint
    return response.data;
    // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
export const userdatacount = async (userid) => {
  try {
    const response = await getApi.get(`mobilestatistic/${userid}`); // Adjust the URL as per your API endpoint
    return response.data;
    // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
