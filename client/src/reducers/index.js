import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import detailReducer from "./isDetails";
import vacaNameReducer from "./isEdit";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged : loggedReducer,
    isDetails : detailReducer,
    isVacaName : vacaNameReducer
})

export default allReducers