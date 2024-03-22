import { getApi } from "../utils/api/api";

export const NotificationData = async () => {
  try {
    const response = await getApi.get(`/Notification/`); // Adjust the URL as per your API endpoint
    console.log(response);
    return response.data;
    // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
