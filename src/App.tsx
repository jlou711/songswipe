import TinderContainer from "./components/TinderContainer/TinderContainer";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddSong from "./components/AddSong/AddSong";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Popular from "./components/Popular/Popular";

function App(): JSX.Element {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<TinderContainer />} />
        <Route path="/add-song" element={<AddSong />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </>
  );
}

export default App;
