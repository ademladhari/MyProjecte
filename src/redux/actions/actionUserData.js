import { data, fetchData, userData } from "../../services/ServiceData"; // Assuming you renamed the function to fetchData
import { FETCH_MEDICATIONS } from "../store/types ";
// Action Creator for fetching medications
export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      // Fetch medications data using the fetchData function
      const response = await userData("1");

      // Dispatch the action with the medications data
      dispatch({
        type: FETCH_MEDICATIONS,
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
