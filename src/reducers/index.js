import { combineReducers } from "redux";
import colorSelection from "./colorSelection";
import inputChange from "./inputChange";

export default combineReducers({ colorSelection, inputChange });
