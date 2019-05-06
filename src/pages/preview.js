import React, { Component } from "react";
import { connect } from "react-redux";
import scriptLoader from "../lib/externalScriptLoader";
import styled, { css } from "styled-components";
import Heading from "../components/heading";
import Button from "../components/button";
import VideoPlayerContainer from "../components/videoPlayer";

const GenerateButton = ({ pluginURL, ...props }) => {
  return (
    <Button as="a" href={pluginURL} download {...props}>Get Plugin</Button>
  )
};

class Preview extends Component {
  constructor(props) {
    super(props);
    this.accountId = props.configs.accountId;
    this.playerId = props.configs.playerId;
    this.videoId = props.configs.videoId;
    
    this.state = {
      pluginURL: ""
    }
  }
  
  componentWillMount() {
    let t = this
    let checkURLInterval = setInterval(() => {
      if (window.pluginURL) {
        t.setState({
          pluginURL: window.pluginURL
        })
        clearInterval(checkURLInterval)
        checkURLInterval = null
      }
    }, 150)
  };
  
  render() {
    return (
      <div>
        <Heading h2 center>Preview</Heading>
        <VideoPlayerContainer fieldId="preview-player" videoId={ this.videoId } accountId={ this.accountId }
            playerId={ this.playerId } configs={ this.props.configs }></VideoPlayerContainer>
          <GenerateButton pluginURL={this.state.pluginURL} top={"20px"} position={"relative"} />
     </div>
    );
  }
}

const mapStateToProps = state => {
  const { configs }= state.sendToPreview
  return { configs };
};

export default connect(mapStateToProps)(Preview);
