import "./App.css";
import { Route, Routes } from "react-router-dom";
import BooksContainer from "./containers/Books/booksContainer";
import HookLearn from "./components/HookLearn/HookLearn";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/hooks" element={<HookLearn />} />
        <Route path="/books" element={<BooksContainer />} />
      </Routes>
    </div>
  );
}

export default App;
