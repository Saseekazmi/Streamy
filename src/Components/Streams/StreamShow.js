import React from "react";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";

import flv from "flv.js";
import { fetchStream } from "../../action";

const StreamShow = ({ match, stream, fetchStream }) => {
  const matchParamId = match.params.id;
  const videoRef = useRef();
  const flvPlayerRef = useRef();

  useEffect(() => {
    //if stream is empty, call fetchStream action
    !stream && fetchStream(matchParamId);

    //if videoRef is present and flvPlayer is not created, create flvPlayer
    if (videoRef.current && !flvPlayerRef.current) {
      flvPlayerRef.current = flv.createPlayer({
        type: "flv",
        url: `http://localhost:8000/live/${matchParamId}.flv`,
      });
      flvPlayerRef.current.attachMediaElement(videoRef.current);
      flvPlayerRef.current.load();
    }

    return () => {
      if (flvPlayerRef.current) flvPlayerRef.current.destroy();
    };
  }, [matchParamId, fetchStream, stream]);

  if (!stream) {
    return <div>Loading....</div>;
  }
  const { title, description } = stream;
  return (
    <div>
      <video src="" ref={videoRef} style={{ width: "100%" }} controls></video>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
