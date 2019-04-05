import ActionTypes from "../actions/actionTypes";

const initialState = {
  configs: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SEND_TO_PREVIEW:
      return Object.assign({}, state, {
        configs: action.configs
      });
      break;
    default:
      return state;
  }
}