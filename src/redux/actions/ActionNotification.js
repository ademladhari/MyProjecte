import { NotificationData } from "../../services/Notificaiton";
import { data, fetchData } from "../../services/ServiceData"; // Assuming you renamed the function to fetchData
import {
  FETCH_MEDICATIONS,
  FETCH_NOTITFICATIONS,
  FETCH_NOtITFICATIONS,
} from "../store/types ";
// Action Creator for fetching medications
export const fetchNotifications = () => {
  return async (dispatch) => {
    try {
      // Fetch medications data using the fetchData function
      const response = await NotificationData();

      console.log("heheh", response);
      // Dispatch the action with the medications data
      dispatch({
        type: FETCH_NOTITFICATIONS,
        payload: response,
      });
    } catch (error) {
      // Handle any errors
      console.error("Error fetching medications:", error);
      // Optionally dispatch an error action
      // dispatch({ type: FETCH_MEDICATIONS_ERROR, payload: error.message });
    }
  };
};
