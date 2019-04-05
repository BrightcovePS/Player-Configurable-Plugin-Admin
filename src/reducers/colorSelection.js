import ActionTypes from "../actions/actionTypes";

const initialState = {
  fieldId: "color",
  color: "#7ed321",
  opened: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_COLORPICKER:
      return Object.assign({}, state, {
        fieldId: action.fieldId,
        opened: !state.opened
      });
      break;
    case ActionTypes.SELECT_COLOR_COMPLETE:
      return Object.assign({}, state, {
        fieldId: action.fieldId,
        color: action.color,
        opened: true
      });
      break;
    default:
      return state;
  }
}