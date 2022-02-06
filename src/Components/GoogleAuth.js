import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../action";
const API_KEY = process.env.REACT_APP_OAUTH_API_KEY;

const GoogleAuth = ({ isSignedIn, signIn, signOut }) => {
  const auth2 = useRef();

  useEffect(() => {
    const OnAuthChange = (isSignedIn) =>
      isSignedIn ? signIn(auth2.current.currentUser.get().getId()) : signOut();

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: API_KEY,
          scope: "email",
        })
        .then(() => {
          auth2.current = window.gapi.auth2.getAuthInstance();
          OnAuthChange(auth2.current.isSignedIn.get());
          auth2.current.isSignedIn.listen(OnAuthChange);
        });
    });
  }, [signIn, signOut]);

  const onSignOut = () => {
    auth2.current.signOut();
  };
  const onSignIn = () => {
    auth2.current.signIn();
  };
  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    }
    return isSignedIn ? (
      <button onClick={onSignOut} className="ui red google button">
        <i className="google icon"></i>
        Sign Out
      </button>
    ) : (
      <button onClick={onSignIn} className="ui red google button">
        <i className="google icon"></i>
        Sign In
      </button>
    );
  };

  return <div className="item">{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  // console.log(state);
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
