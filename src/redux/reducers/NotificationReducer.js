import { FETCH_MEDICATIONS, FETCH_NOTITFICATIONS } from "../store/types ";

const initialState = {
  notification: {},
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTITFICATIONS:
      return {
        ...state,
        notification: action.payload.notifications,
      };
    default:
      return state;
  }
};

export default NotificationReducer;
