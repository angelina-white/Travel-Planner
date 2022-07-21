import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import detailReducer from "./isDetails";
import vacaNameReducer from "./isEdit";
import booksReducer from "./books"
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged : loggedReducer,
    isDetails : detailReducer,
    isVacaName : vacaNameReducer,
    books : booksReducer
})

export default allReducers