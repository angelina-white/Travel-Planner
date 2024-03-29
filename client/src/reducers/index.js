import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import detailReducer from "./isDetails";
import vacaNameReducer from "./isEdit";
import booksReducer from "./books"
import vacaReducer from "./vacas"
import settingsReducer from "./isSettings";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged : loggedReducer,
    isDetails : detailReducer,
    isVacaName : vacaNameReducer,
    books : booksReducer,
    vacas : vacaReducer,
    isSettings : settingsReducer
})

export default allReducers