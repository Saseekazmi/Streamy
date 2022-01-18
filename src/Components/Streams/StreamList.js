import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStreamList } from "../../action";

const StreamList = ({ streams, fetchStreamList, userId, isSignedIn }) => {
  useEffect(() => {
    fetchStreamList();
  }, [fetchStreamList]);

  const renderButtons = (stream) => {
    return (
      <div className="right floated content">
        <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
          Edit
        </Link>
        <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
          Delete
        </Link>
      </div>
    );
  };

  const renderList = () => {
    return streams.map((stream) => (
      <div className="item" key={stream.id}>
        {stream.userId === userId && renderButtons(stream)}
        <i className="large icon camera middle aligned" />
        <div className="content">
          <Link to={`/streams/show/${stream.id}`} className="header">
            {stream.title}
          </Link>
          <div className="description">{stream.description}</div>
        </div>
      </div>
    ));
  };

  const renderCreate = () => {
    // <button className="ui button primary">Create</button>;
    if (isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    userId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { fetchStreamList })(StreamList);
