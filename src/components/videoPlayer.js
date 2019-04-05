import React, { Component } from "react";
import scriptLoader from "../lib/externalScriptLoader";
import styled, { css } from "styled-components";
import applyPlugin from "../playerPlugin/playerLocalPlugin";

const VideoPlayer = styled.video.attrs(({ accountId, playerId, videoId, ...props }) => ({
  "data-video-id": videoId, 
  "data-account": accountId,
  "data-player": playerId
}))`
  width: 100%;
  height: 50rem;
`;

class VideoPlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.fieldId = props.fieldId;
    this.accountId = props.accountId || "79558313";
    this.playerId = props.playerId || "LDOMfJufZ";
    this.videoId = props.videoId || "2784419339001";
  }
  
  componentDidMount() {
    scriptLoader("player-script",
      "//players.brightcove.net/" + this.accountId + "/" + this.playerId + "_default/index.min.js",
     () => {
       applyPlugin(this.props.configs);
     });
  }
  
  render() {
    return (
      <div>
        <VideoPlayer id={ this.fieldId } videoId={ this.videoId } accountId={ this.accountId }
            playerId={ this.playerId } 
            data-embed="default" 
            data-application-id 
            className="video-js" 
          controls></VideoPlayer>
      </div>
    );
  }
}

export default VideoPlayerContainer;
