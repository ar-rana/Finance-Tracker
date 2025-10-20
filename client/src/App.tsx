import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import WarningModal from "./components/modal/WarningModal.tsx";
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
    </BrowserRouter>
  );
}

export default App;
