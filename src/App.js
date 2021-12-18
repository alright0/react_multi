import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Protocol from "./components/Protocol/Protocol";
import Books from "./components/Books/Books";
import ProtocolList from "./components/ProtocolList/ProtocolList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/protocol/new" element={<Protocol />} />
        <Route path="/protocol/edit/:protocolId" element={<Protocol />} />
        <Route path="/protocollist" element={<ProtocolList />} />
      </Routes>
    </div>
  );
}

export default App;
