import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import DashBoard from "./pages/DashBoard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
