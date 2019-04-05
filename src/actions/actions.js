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

export const toggleColorPicker = makeActionCreator(ActionTypes.TOGGLE_COLORPICKER, "fieldId");
export const selectColorComplete = makeActionCreator(ActionTypes.SELECT_COLOR_COMPLETE, "fieldId", "color");
export const enterText = makeActionCreator(ActionTypes.ENTER_TEXT, "fieldId", "val");
export const sendToPreview = makeActionCreator(ActionTypes.SEND_TO_PREVIEW, "configs");