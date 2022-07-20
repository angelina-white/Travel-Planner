import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import detailReducer from "./isDetails";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged : loggedReducer,
    isDetails : detailReducer
})

export default allReducers