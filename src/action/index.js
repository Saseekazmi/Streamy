import { SIGN_IN, SIGN_OUT } from "./types";

const signIn = (userId) => {
  return { type: SIGN_IN, payload: userId };
};
const signOut = (userId) => {
  return { type: SIGN_OUT, payload: userId };
};

export { signIn, signOut };
