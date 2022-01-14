import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../action";
import StreamForm from "./StreamForm";

const StreamEdit = ({ stream, fetchStream, editStream, match }) => {
  const matchParamId = match.params.id;
  useEffect(() => {
    fetchStream(matchParamId);
  }, [fetchStream, matchParamId]);

  const onSubmit = (formValues) => {
    editStream(matchParamId, formValues);
  };

  //validation to check props present or not
  if (!stream) {
    return <div>Loading....</div>;
  }

  const { title, description } = stream;
  return (
    <div>
      <h3>Edit Stream</h3>
      <StreamForm onSubmit={onSubmit} initialValues={{ title, description }} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
