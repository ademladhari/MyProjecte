import { FETCH_MEDICATIONS } from "../store/types ";

const initialState = {
  medications: [],
};

const medicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEDICATIONS:
      return {
        ...state,
        medications: action.payload,
      };
    default:
      return state;
  }
};

export default medicationReducer;
