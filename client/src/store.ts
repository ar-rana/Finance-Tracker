import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "./redux/modalSlice";
import settingsReducer from "./redux/settingsSlice";

const rootReducer = combineReducers({
    modals: modalReducer,
    settings: settingsReducer,
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