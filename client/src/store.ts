import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalSlice from "./redux/modalSlice";

const rootReducer = combineReducers({
    modals: modalSlice 
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