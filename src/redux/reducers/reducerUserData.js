import { fetchUserData } from "../actions/actionUserData";
import { FETCH_MEDICATIONS, FETCH_USERDATA } from "../store/types ";

const initialState = {
  UserData: {},
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERDATA:
      return {
        ...state,
        UserData: action.payload,
      };
    default:
      return state;
  }
};

export default userDataReducer;
