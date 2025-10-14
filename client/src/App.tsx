import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import { createContext, useEffect, useState } from "react";
import WarningModal from "./components/modal/WarningModal.tsx";
import type { AppContextState } from "./types/Component.ts";

const AppContext = createContext<AppContextState | null>(null);

function App() {
  const [warn, setWarn] = useState<boolean>(true);
  const [warning, setWarning] = useState<string>("Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore modi ratione.");

  useEffect(() => {
    if (warning) setWarn(true);
  }, [warning]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ setWarning }}>
        <WarningModal open={warn} setOpen={setWarn} warning={warning} setWarning={setWarning} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
