import ActionTypes from "../actions/actionTypes";

const initialState = {
  fieldId: "",
  text: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ENTER_TEXT:
      return Object.assign({}, state, {
        fieldId: action.fieldId,
        text: action.text
      });
      break;
    default:
      return state;
  }
}