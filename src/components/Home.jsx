import React, { useContext, useState, useRef, useEffect } from 'react';
import noteContext from "../context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import Footer from "./Footer";
import About from "./About";
import HomePage from './HomePage';
import ContactUs from './Contactus';

const Home = (props) => {
  const context = useContext(noteContext);
  const { notes, updateNotes, fetchNotes } = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });


  // fetchNotes()
  const updateNote = (currentNote) => {
    ref.current.click(); // Open modal
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
    
  };

  const handleClick = (e) => {
    e.preventDefault();
    updateNotes(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    
    props.showAlert("notes updated sucessfully", "primary");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <HomePage />
      <About />
      <ContactUs />
      <Footer />
      
    </>
  );
};

export default Home;
