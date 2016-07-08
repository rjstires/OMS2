import { combineReducers } from "redux";
import registration from "../modules/registration.duck";

import {reducer as form} from "redux-form";

const rootReducer = combineReducers({
  registration,
  form
});

export default rootReducer;
