import TinderContainer from "./components/TinderContainer/TinderContainer";
import NavBar from "./components/NavBar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddSong from "./components/AddSong/AddSong";

function App(): JSX.Element {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<TinderContainer />} />
        <Route path="/add-song" element={<AddSong />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </>
  );
}

export default App;
