import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useState, useEffect } from "react";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";
import AddNotes from './components/AddNotes';
import EditNotes from './components/EditNotes.jsx';
import PreviewNotes from './components/PreviewNotes.jsx';

function App() {
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert({ msg: "", type: "" });
    }, 1000);
  };
  

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {alert.msg && <Alert alert={alert} />}
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/addnotes" element={<AddNotes showAlert={showAlert} />} />
            <Route path="/profile" element={<Profile showAlert={showAlert} />} />
            <Route path="/editnotes" element={<EditNotes showAlert={showAlert} />} />
            <Route path="/previewNotes" element={<PreviewNotes showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>

    </>
  );
}
console.warn = () => { };


export default App;
