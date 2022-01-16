import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStream, deleteStream } from "../../action/index.js";
import history from "../../history.js";
import Modal from "../../Modal.js";

const StreamDelete = ({ stream, match, fetchStream, deleteStream }) => {
  const matchParamId = match.params.id;
  useEffect(() => {
    fetchStream(matchParamId);
  }, [matchParamId, fetchStream]);

  const renderActionBtn = () => {
    return (
      <React.Fragment>
        <button onClick={() => deleteStream(matchParamId)} className="ui  button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  return (
    <div>
      <Modal
        title="StreamDelete"
        description={`Are you sure you want to delete ${
          stream ? `the stream with title ${stream.title}` : `this stream`
        }?`}
        actions={renderActionBtn()}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
