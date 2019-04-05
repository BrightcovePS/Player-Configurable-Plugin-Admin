import { combineReducers } from "redux";
import colorSelection from "./colorSelection";
import inputChange from "./inputChange";
import sendToPreview from "./sendToPreview";

export default combineReducers({ colorSelection, inputChange, sendToPreview });
