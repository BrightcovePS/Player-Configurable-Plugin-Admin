import React from "react";
import { connect } from "react-redux";
import { toggleColorPicker } from "../actions/actions";
import { SketchPicker } from "react-color";
import styled, { css } from "styled-components";

const ColorPickerWrapper = styled.div`
  position: absolute;
  top: 65rem;
  left: 1rem;
  display: ${props => {
      if (props.pickerState && props.pickerState.opened) return "block"
      return "none"
  }};
`;

class ColorPicker extends React.Component {
  state = {
    background: '#fff',
  };
  
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.handleChangeComplete(this.props.colorSelection.fieldId, color);
  }

  render() {
    return (
      <ColorPickerWrapper pickerState={ this.props.colorSelection }>
        <SketchPicker
          color={ this.state.background }
          onChangeComplete={ this.handleChangeComplete }
        />
      </ColorPickerWrapper>
    );
  }
}

const mapStateToProps = state => {
  const { colorSelection } = state;
  return { colorSelection };
};


export default connect(mapStateToProps, { toggleColorPicker })(ColorPicker);