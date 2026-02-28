import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import WarningModal from "./components/modal/WarningModal.tsx";
import SuccessModal from "./components/modal/SuccessModal.tsx";
import { useAppSelector } from "./hooks/reduxHooks";
// import type { AppContextState } from "./types/Component.ts";

// const AppContext = createContext<AppContextState | null>(null);

function App() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user ? <DashBoard /> : <Navigate to="/" />} />
      </Routes>
      <WarningModal />
      <SuccessModal />
    </BrowserRouter>
  );
}

export default App;
