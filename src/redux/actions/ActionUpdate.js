import { getApi } from "../../utils/api/api"; // Import the Axios instance
import {
  PATCH_DATA_FAILURE,
  PATCH_DATA_SUCCESS,
} from "../reducers/UpdateDemande";

export const patchData = (demandId, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await getApi.patch(`/demand/${demandId}`, updatedData);
      // Make PATCH request to your API endpoint
      dispatch({ type: PATCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Error making PATCH request:", error);

      dispatch({ type: PATCH_DATA_FAILURE, payload: error.message });
    }
  };
};
