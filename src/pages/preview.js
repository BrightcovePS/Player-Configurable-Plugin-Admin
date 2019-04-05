import React, { Component } from "react";
import { connect } from "react-redux";
import scriptLoader from "../lib/externalScriptLoader";
import styled, { css } from "styled-components";
import Heading from "../components/heading";
import VideoPlayerContainer from "../components/videoPlayer";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.accountId = props.configs.accountId;
    this.playerId = props.configs.playerId;
    this.videoId = props.configs.videoId;
  }
  
  componentDidMount() {
  };
  
  render() {
    return (
      <div>
      <Heading h2 center>Preview</Heading>
      <VideoPlayerContainer fieldId="preview-player" videoId={ this.videoId } accountId={ this.accountId }
          playerId={ this.playerId } configs={ this.props.configs }></VideoPlayerContainer>
     </div>
    );
  }
}

const mapStateToProps = state => {
  const { configs }= state.sendToPreview
  return { configs };
};

export default connect(mapStateToProps)(Preview);
