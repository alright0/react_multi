import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Protocol from "./components/Protocol/Protocol";
import Books from "./components/Books/Books";
import ProtocolList from "./components/ProtocolList/ProtocolList";

export const MEDIA_URL = "http://192.168.0.104:20000/media/";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/protocol/edit/:protocolId" element={<Protocol />} />
        <Route path="/protocollist" element={<ProtocolList />} />
      </Routes>
    </div>
  );
}

export default App;
