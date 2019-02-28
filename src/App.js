import React, { Component } from "react";
import styled, { css } from "styled-components";
import InputContainer from "./components/inputContainer";
import ColorContainer from "./components/colorContainer";
import Heading from "./components/heading";

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
      </AppDiv>
    );
  }
}

export default App;
