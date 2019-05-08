import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import GenerateConfig from "../lib/configGenerator";
import { sendToPreview } from "../actions/actions";
import { Panel } from "@brightcove/studio-components";
import "../styles/admin.scss";
import styled, { css } from "styled-components";
import Button from "../components/button";
import InputContainer from "../components/inputContainer";
import ColorContainer from "../components/colorContainer";
import DropDownListContainer from "../components/dropdownList";
import Heading from "../components/heading";

const PreviewButton = ({ configs, history, sendtopreview, ...props }) => {
  return (
    <Button onClick={() => {
      history.push("/preview");
      sendtopreview(GenerateConfig(configs));
    }} name="Preview" {...props} />
  )
};

const AppDiv = styled.div.attrs(({}) => ({
  className: "App"
}))``;

const config = {
  jQuery: "1.7.2",
  pluginName: "CustomPlugin",
  accountId: "79558313",
  playBarLogo: "https://s3.amazonaws.com/kkashalkar-sandbox/brightcove_gif.gif",
  playBarLogoHeight: 2,
  playBarLogoWidth: 6,
  brandLogo: "https://s3.amazonaws.com/kkashalkar-sandbox/brightcove_gif.gif",
  brandLogoHeight: 5,
  brandLogoWidth: 16,
  logoAnime: "fly-down",
  logoPos: "upper-left",
  playerId: "LDOMfJufZ",
  scrubber: "https://s3.amazonaws.com/kkashalkar-sandbox/brightcove_icon.jpg",
  timeColor: "#7ed321",
  videoId: "2784419339001"
};

class App extends Component {
  render() {
    return (
      <AppDiv>
        <Heading h2 center>Player Plugin Admin</Heading>
        <Panel className="config-panel" title="Configurations">
          <InputContainer fieldId="pluginName" fieldName="Plugin Name" value={config.pluginName} description="No Space Allowed" />
          <InputContainer fieldId="accountId" fieldName="Account ID" value={config.accountId} />
          <InputContainer fieldId="playerId" fieldName="Player ID" value={config.playerId} />
          <InputContainer fieldId="videoId" fieldName="Video ID" value={config.videoId} />
          <InputContainer fieldId="scrubber" fieldName="Scrubber Icon URL" value={config.scrubber} />
          <InputContainer fieldId="playBarLogo" fieldName="Control Bar Logo URL" value={config.playBarLogo} />
          <InputContainer fieldId="playBarLogoHeight" fieldName="Control Bar Logo Height (rem)" value={config.playBarLogoHeight} />
          <InputContainer fieldId="playBarLogoWidth" fieldName="Control Bar Logo Width (rem)" value={config.playBarLogoWidth}/>
          <InputContainer fieldId="brandLogo" fieldName="Video Icon URL" value={config.brandLogo} />
          <InputContainer fieldId="brandLogoHeight" fieldName="Video Icon Height (rem)" value={config.brandLogoHeight} />
          <InputContainer fieldId="brandLogoWidth" fieldName="Video Icon Width (rem)" value={config.brandLogoWidth} />
          <DropDownListContainer fieldId="logoPos" fieldName="Video Icon Position"
              value={config.logoPos}
              options={[{
                name: "Upper Right",
                val: "upper-right"
              }, {
                name: "Upper Left",
                val: "upper-left"
              }, {
                name: "Lower Right",
                val: "lower-right"
              }, {
                name: "Lower Left",
                val: "lower-left"
              }, {
                name: "Center",
                val: "center"
              }]} />
            <DropDownListContainer fieldId="logoAnime" fieldName="Video Icon Animation"
              value={config.logoAnime}
              options={[{
                name: "Fly Right",
                val: "fly-right"
              }, {
                name: "Fly Left",
                val: "fly-left"
              }, {
                name: "Fly Up",
                val: "fly-up"
              }, {
                name: "Fly Down",
                val: "fly-down"
              }, {
                name: "Fade Out",
                val: "fade-out"
              }, {
                name: "Shrink",
                val: "shrink"
              }]} />
          <ColorContainer fieldId="timeColor" fieldName="Time Color" />
          <PreviewButton configs={ this.props.state } history={ this.props.history } 
          sendtopreview={ this.props.sendToPreview } style={{"top": "2rem", "marginBottom": "2rem"}} />
        </Panel>
      </AppDiv>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps, { sendToPreview })(App);
