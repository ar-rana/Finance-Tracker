import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import WarningModal from "./components/modal/WarningModal.tsx";
import SuccessModal from "./components/modal/SuccessModal.tsx";
// import type { AppContextState } from "./types/Component.ts";

// const AppContext = createContext<AppContextState | null>(null);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
      <WarningModal />
      <SuccessModal />
    </BrowserRouter>
  );
}

export default App;
