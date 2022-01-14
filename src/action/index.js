import streams from "../api/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM_LIST,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "./types";

const signIn = (userId) => {
  return { type: SIGN_IN, payload: userId };
};
const signOut = (userId) => {
  return { type: SIGN_OUT, payload: userId };
};
const createStream = (formValues) => async (dispatch, getState) => {
  const response = await streams.post("/streams", {
    ...formValues,
    userId: getState().auth.userId,
  });
  dispatch({
    type: CREATE_STREAM,
    payload: response.data,
  });
};

const fetchStreamList = () => async (dispatch) => {
  const response = await streams.get("/streams");
  console.log(response);
  dispatch({
    type: FETCH_STREAM_LIST,
    payload: response.data,
  });
};

const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });
};
const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.put(`/streams/${id}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: response.data,
  });
};
const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams${id}`);
  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });
};
export { signIn, signOut, createStream, fetchStream, fetchStreamList, editStream, deleteStream };
