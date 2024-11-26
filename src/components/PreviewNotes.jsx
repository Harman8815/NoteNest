import React, { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../context/Notes/NoteContext";
import ReactMarkdown from "react-markdown"; // Import for rendering Markdown
import Footer from "./Footer";
import { useLocation } from "react-router-dom"; // Import for accessing passed state

import { useNavigate } from "react-router-dom";
const PreviewNotes = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get the state passed from the NoteItem component (via navigate)
  const { note } = state; // Access the note object from the state

  const context = useContext(noteContext);
  const { updateNotes, deleteNote } = context;
  const options = ["default", "work", "personal", "important"];

  // Initialize state with the passed note
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  
  const handleAddClick = () => { navigate(`/addnotes`)};
  const handleEditClick = () => {
    navigate(`/editNotes`, { state: { note } });
  };
  const handleDeleteClick = () => {
    deleteNote(note._id);
    props.showAlert("Note deleted successfully", "danger");
    navigate(`/profile`);
  };
  const onChange = (event) => {
    setEditedNote({ ...editedNote, [event.target.name]: event.target.value });
  };

  const previewRef = useRef(null); // Create a reference to the preview div


  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      <div className="container my-4">
        {/* Topic Label and Tag */}
        <div className="d-flex justify-content-between">
          <h3>{capitalize(editedNote.title)}</h3>
          <span className="badge bg-secondary" style={{ padding: "5px" }}>
            {capitalize(editedNote.tag)}
          </span>
        </div>

        {/* Date */}
        <p className="text-muted">{note.date}</p>

        {/* Description */}
        <div
          id="preview"
          className="border rounded p-3"
          style={{
            minHeight: "50vh",
            maxHeight: "80vh", // Set a maximum height for the scroll area
            backgroundColor: "#f8f9fa",
            overflowY: "auto", // Enable vertical scrolling
            overflowX: "hidden", // Hide horizontal scrolling
          }}
          ref={previewRef}
        >
          <ReactMarkdown>{editedNote.description}</ReactMarkdown>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-primary" onClick={handleAddClick}>
            Add Note
          </button>
          <button className="btn btn-warning" onClick={handleEditClick}>
            Edit Note
          </button>
          <button className="btn btn-danger" onClick={handleDeleteClick}>
            Delete Note
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PreviewNotes;
