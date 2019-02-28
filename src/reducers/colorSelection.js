import ActionTypes from "../actions/actionTypes";

const initialState = {
  color: "#000000",
  opened: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_COLORPICKER:
      return Object.assign({}, state, {
        opened: !state.opened
      });
      break;
    case ActionTypes.SELECT_COLOR_COMPLETE:
      return Object.assign({}, state, {
        color: action.color,
        opened: true
      });
      break;
    default:
      return state;
  }
}