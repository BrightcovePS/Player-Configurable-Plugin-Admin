import ActionTypes from "../actions/actionTypes";

const initialState = {
  inputs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ENTER_TEXT:
      let newState = Object.assign({}, state);
      for (let i = 0; i < newState.inputs.length; i ++) {
        if (newState.inputs[i].fieldId === action.fieldId) {
          newState.inputs[i].val = action.val;
          return newState;
        }
      }
      newState.inputs.push({
        fieldId: action.fieldId,
        val: action.val
      })
      return newState;
      break;
    default:
      return state;
  }
}