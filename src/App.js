import React, { Component } from "react";
import { connect } from "react-redux";
import GenerateConfig from "./lib/configGenerator";
import styled, { css } from "styled-components";
import Button from "./components/button";
import InputContainer from "./components/inputContainer";
import ColorContainer from "./components/colorContainer";
import Heading from "./components/heading";

const PreviewButton = ({ configs, ...props }) => {
  return (
    <Button onClick={() => {
      GenerateConfig(configs);  
      }} {...props}>Preview</Button>
  )
};

const AppDiv = styled.div.attrs(({}) => ({
  className: "App"
}))`
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <AppDiv>
        <Heading h2 center>Player Plugin Admin</Heading>
        <InputContainer fieldId="icon" fieldName="Video Icon URL"/>
        <InputContainer fieldId="sprite" fieldName="Sprite Icon URL"/>
        <ColorContainer />
        <PreviewButton configs={ this.props.state } />
      </AppDiv>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(App);
