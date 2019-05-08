import React, { Component } from "react";
import { connect } from "react-redux";
import { enterText } from "../actions/actions";
import { Input } from "@brightcove/studio-components";
import styled, { css } from "styled-components";

const InputContainerDiv = styled.div.attrs(({}) => ({
  className: "input-container"
}))`
  margin-right: 1rem;
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
  
  handleInputChange(val) {
    this.setState({ value: val })
    this.props.enterText(this.fieldId, val);
  }
  
  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      value: nextProps.value
    })
    this.props.enterText(this.fieldId, nextProps.value);
  }
  
  render() {
    return (
      <InputContainerDiv>
        <Input
          label={this.fieldName}
          placeholder="placeholder"
          value={this.state.value}
          onChange={(e) => { this.handleInputChange(e) }}
          disabled={this.disabled}
          description={this.props.description}
        />
      </InputContainerDiv>
    );
  }
}

const mapStateToProps = state => {
  const { colorSelection } = state;
  return { colorSelection };
};

export default connect(mapStateToProps, { enterText })(InputContainer);
