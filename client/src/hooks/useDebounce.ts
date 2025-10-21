import { useEffect } from "react";
import type { Debounce } from "../types/Component";
import { useAppDispatch } from "./reduxHooks";

export default function useDebounce({func = null, timer = 300, payload = null, thunk = null }: Debounce): any {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (payload) {
        if (thunk) dispatch(thunk(payload));
        else func(payload);
      } else {
        if (thunk) dispatch(thunk());
        else func();
      }
    }, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [func, timer, payload, thunk]);
}
