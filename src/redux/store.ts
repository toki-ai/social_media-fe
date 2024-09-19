import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/auth.reducers";

const rootReducers = combineReducers({
    auth: authReducer
})

const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

export default store;