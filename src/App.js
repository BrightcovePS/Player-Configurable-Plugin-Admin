import React, { Component } from "react";
import styled, { css } from "styled-components";
import Button from "./components/button";
import InputContainer from "./components/inputContainer";
import ColorContainer from "./components/colorContainer";
import Heading from "./components/heading";

const PreviewButton = ({ ...props }) => {
  return (
    <Button onClick={() => {
      console.info("Previewing.");  
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
        <PreviewButton />
      </AppDiv>
    );
  }
}

export default App;
