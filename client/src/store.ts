import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "./redux/modalSlice";
import settingsReducer from "./redux/settingsSlice";
import userReducer from "./redux/userSlice";
import dataReducer from "./redux/dataSlice";

// there is somr 'applyMiddleware' functionality in redux

const rootReducer = combineReducers({
    modals: modalReducer,
    settings: settingsReducer,
    user: userReducer,
    data: dataReducer,
})

// now my reduxt state will lool like
// {
//   modals: { ... },
//   counter: { ... }
// }

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;