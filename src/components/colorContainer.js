import React, { Component } from "react";
import { connect } from "react-redux";
import InputContainer from "./inputContainer";
import ColorPicker from "./colorPicker";
import Button from "./button";
import { toggleColorPicker, selectColorComplete } from "../actions/actions";
import styled, { css } from "styled-components";

const ColorPreviewBlock = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${props => props.color};
  position: relative;
  top: -3.2rem;
  left: 33.4rem;
  border-radius: 3px;
}
`;

class ColorContainer extends Component {
  constructor(props) {
    super(props);
    this.fieldId = props.fieldId;
    this.fieldName = props.fieldName;
  }
  
  handleColorChangeComplete = (fieldId, color) => {
    // this fieldId is the active fieldId, different from this.fieldId.
    this.props.selectColorComplete(fieldId, color.hex);
  };
  
  handleColorButtonPress = () => {
    this.props.toggleColorPicker(this.fieldId);
  };
  
  render() {
    return (
      <div className="color-container" id={ this.fieldId }>
        <InputContainer fieldId={ this.fieldId } fieldName={ this.fieldName } 
        value={ this.props.colorSelection.color }
        disabled={ true }
        />
        <Button onClick={ this.handleColorButtonPress } name="Choose Color" />
        <ColorPreviewBlock color={ this.props.colorSelection.color } />
        <ColorPicker handleChangeComplete={ this.handleColorChangeComplete }/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { colorSelection } = state;
  return { colorSelection };
};

export default connect(mapStateToProps, { toggleColorPicker, selectColorComplete })(ColorContainer);
