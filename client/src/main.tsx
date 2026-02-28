import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store.ts";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

import { clearUser } from "./redux/userSlice";

axios.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success === false && response.data.message?.includes("Unauthorized")) {
      store.dispatch(clearUser());
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.data?.message?.includes("Unauthorized")) {
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
