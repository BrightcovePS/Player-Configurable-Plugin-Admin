import React from "react";
import { Button } from "@brightcove/studio-components";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  position: ${props => props.position};
  left: ${props => props.left};
  top: ${props => props.top};
  cursor: pointer;
  text-decoration: none;
  :focus {
    outline: none;
  }
  :hover {
    background-color: palevioletred;
    color: #fff;
  }
`;

const BCButton = ({ name, onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props} >
      {name}
    </Button>
  )
}

export default BCButton;
