import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EntryValidation from "./pages/EntryValidation";
import AllParticipants from "./pages/AllParticipants";
import { useState } from "react";
import LoginValidation from "./pages/LoginValidation";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <LoginValidation onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryValidation />} />
        <Route path="/participantes" element={<AllParticipants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
