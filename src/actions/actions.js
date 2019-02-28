import ActionTypes from "./actionTypes";

function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const toggleColorPicker = makeActionCreator(ActionTypes.TOGGLE_COLORPICKER);
export const selectColorComplete = makeActionCreator(ActionTypes.SELECT_COLOR_COMPLETE, "color");