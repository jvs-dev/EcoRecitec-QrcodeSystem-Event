import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EntryValidation from "./pages/EntryValidation";
import AllParticipants from "./pages/AllParticipants";

function App() {
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
