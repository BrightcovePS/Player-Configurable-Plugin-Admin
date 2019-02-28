import React, { Component } from "react";
import styled, { css } from "styled-components";

const InputLabel = styled.label.attrs(({ fieldId }) => ({
  htmlFor: fieldId
}))`
  font-size: 2rem;
  width: 20rem;
  display: inline-block;
`;

const InputField = styled.input.attrs(({ fieldId, size }) => ({
  type: "text",
  id: fieldId,
  className: "input-field",
  margin: size || "1em",
  padding: size || "1em"
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 35em;

  /* here we use the dynamically computed props */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

const InputContainerDiv = styled.div.attrs(({}) => ({
  className: "input-container"
}))`
  width: 100%
`;

class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.fieldId = props.fieldId;
    this.fieldName = props.fieldName;
    this.size = props.size;
    this.value = props.value;
  }
  
  componentDidUpdate() {
    this.value = this.props.value;
  }
  
  render() {
    return (
      <InputContainerDiv>
        <InputLabel fieldId={this.fieldId}>{this.fieldName}</InputLabel>
        <InputField fieldId={this.fieldId} size={this.size} value={this.value} disabled/>
      </InputContainerDiv>
    );
  }
}

export default InputContainer;
