import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

// we can import RootState and AppDispatch types in each component
// but its better to make types version of them to be used universally in the application

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// like this you won't have to do this:
// ... (state: RootState) ... and ... (state: RootState): AppDispatch => ...
// in each component