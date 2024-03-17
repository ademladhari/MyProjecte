import { FETCH_MEDICATIONS } from "../store/types ";

const initialState = {
  demandes: {},
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEDICATIONS:
      return {
        ...state,
        demandes: action.payload.demandes,
      };
    default:
      return state;
  }
};

export default userDataReducer;
