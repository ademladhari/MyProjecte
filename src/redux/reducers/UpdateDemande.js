export const PATCH_DATA_SUCCESS = "PATCH_DATA_SUCCESS";
export const PATCH_DATA_FAILURE = "PATCH_DATA_FAILURE";
const initialState = {
  updatedData: {},
};

const patchReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH_DATA_SUCCESS:
      return {
        ...state,
        updatedData: {
          ...state.updatedData,
          [action.payload.demandId]: action.payload.updatedData,
        },
      };
    default:
      return state;
  }
};

export default patchReducer;
