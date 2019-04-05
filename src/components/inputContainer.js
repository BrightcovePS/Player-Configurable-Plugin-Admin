import React, { Component } from "react";
import { connect } from "react-redux";
import { enterText } from "../actions/actions";
import styled, { css } from "styled-components";

const InputLabel = styled.label.attrs(({ fieldId }) => ({
  htmlFor: fieldId
}))`
  font-size: 1.2rem;
  width: 20rem;
  display: inline-block;
  text-align: left;
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
    this.disabled = props.disabled;
    this.state = {
      value: props.value
    }
  }
  
  componentDidMount() {
    this.props.enterText(this.fieldId, this.state.value);
  }
  
  handleInputChange(e) {
    e.persist();
    this.setState({ value: e.target.value })
    this.props.enterText(this.fieldId, e.target.value);
  }
  
  componentWillUpdate(nextProps) {
    this.value = nextProps.value;
  }
  
  render() {
    return (
      <InputContainerDiv>
        <InputLabel fieldId={this.fieldId}>{this.fieldName}</InputLabel>
        <InputField fieldId={this.fieldId} size={this.size} 
        value={this.state.value} onChange={(e) => { this.handleInputChange(e) }} disabled={this.disabled}/>
      </InputContainerDiv>
    );
  }
}

const mapStateToProps = state => {
  const { colorSelection } = state;
  return { colorSelection };
};

export default connect(mapStateToProps, { enterText })(InputContainer);
