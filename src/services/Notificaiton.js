import { getApi } from "../utils/api/api";

export const NotificationData = async () => {
  try {
    const response = await getApi.get(`/NotificationTokens`); // Adjust the URL as per your API endpoint

    return response.data;
    // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
export const NotificationTokenPost = async (UserID, NotificationToken) => {
  try {
    const response = await getApi.post("/NotificationTokens", {
      UserID: UserID,
      NotificationToken: NotificationToken,
    });
    return response; // Assuming you want to return the response data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
export const updateDemandes = async (groupIds) => {
  try {
    console.log("he", groupIds);
    const response = await getApi.post("/MobileDemand/AffectGroup", {
      arrivalLabId: "28",
      departureLabId: "29",
      demandeIds: groupIds,
    });
    return response; // Assuming you want to return the response data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
// prettier-ignore
export const NotificationTokenDelete = async (NotifcationID) => {
  try {
    console.log('nt',NotifcationID);
    const response = await getApi.delete(`/NotificationTokens/${NotifcationID}`);
    return response; // Assuming you want to return the response data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
export const NotificationHistoryData = async () => {
  try {
    const response = await getApi.get(`/NotificationMsg`); // Adjust the URL as per your API endpoint

    return response.data;
    // Assuming you want to return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
