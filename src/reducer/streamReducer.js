import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAM_LIST,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../action/types.js";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      console.log(state);
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAM_LIST:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_STREAM:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};

export default streamReducer;
