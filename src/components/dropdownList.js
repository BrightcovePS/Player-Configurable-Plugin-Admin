import React, { Component } from "react";
import { connect } from "react-redux";
import { enterText } from "../actions/actions";
import styled, { css } from "styled-components";

const DropDownListLabel = styled.label.attrs(({ fieldId }) => ({
  htmlFor: fieldId
}))`
  font-size: 1.2rem;
  width: 22rem;
  display: inline-block;
  text-align: left;
`;

const DropDownList = styled.select.attrs(({ fieldId }) => ({
  id: fieldId
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 37.5em;

  /* here we use the dynamically computed props */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

const DropDownOption = styled.option``;

const DropDownContainerDiv = styled.div.attrs(({}) => ({
  className: "dropdown-container"
}))`
  width: 100%
`;

class DropDownListContainer extends Component {
  constructor(props) {
    super(props);
    this.fieldId = props.fieldId;
    this.fieldName = props.fieldName;
    this.options = props.options;
    this.state = {
      value: props.value
    }
  }
  
  componentDidMount() {
    this.props.enterText(this.fieldId, this.state.value);
  }
  
  handleListChange(e) {
    e.persist();
    this.setState({ value: e.target.value });
    this.props.enterText(this.fieldId, e.target.value);
  }
  
  render() {
    return (
      <DropDownContainerDiv>
        <DropDownListLabel fieldId={this.fieldId}>{this.fieldName}</DropDownListLabel>
        <DropDownList fieldId={this.fieldId} defaultValue={this.state.value} onChange={(e) => { this.handleListChange(e) }}>
        <DropDownOption key="none" value="none">--Select--</DropDownOption>
        { this.options.map((option, i) => 
          <DropDownOption key={option.val} value={option.val}>{option.name}</DropDownOption>
        ) }
        </DropDownList>
      </DropDownContainerDiv>
    );
  }
}

export default connect(null, { enterText })(DropDownListContainer);
