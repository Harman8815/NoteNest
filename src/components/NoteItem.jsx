import React, { useContext } from "react";
import noteContext from "../context/Notes/NoteContext";
import ReactMarkdown from "react-markdown"; 
import { useNavigate } from 'react-router-dom';

const NoteItem = ({ note, updateNote, showAlert }) => {
  const navigate = useNavigate(); // Hook to navigate
  const { _id, title, description, tag, date } = note;

  // Handle edit button click - navigate to the edit route with note as state
  const handleEditClick = () => {
    navigate(`/editNotes`, { state: { note } });
  };const handlePreviewClick = () => {
    navigate(`/previewNotes`, { state: { note } });
  };
  
  const context = useContext(noteContext);
  const { deleteNote } = context;

  // Handle delete button click - delete the note
  const handleDelete = () => {
    deleteNote(_id);
    showAlert("Note deleted successfully", "danger");
  };

  // Function to truncate the description with '...' if it's too long
  const truncateDescription = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  return (
    <div className="card bg-light mb-3" style={{ width: "25rem" }}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <span><b>{title}</b></span>
      </div>
      <div className="card-body">
        <p className="card-text">
          <b>Description: </b>
          <div className="markdown-content">
            <ReactMarkdown>{truncateDescription(description, 100)}</ReactMarkdown>
          </div>
        </p>
        <p className="card-text">
          <b>Tag: </b>
          {tag}
        </p>
        <p className="card-text">
          <b>Date: </b>
          {new Date(date).toLocaleString()}
        </p>
        <div className="d-flex justify-content-end">
          <i
            className="fa-solid fa-trash mx-2 text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={handleEditClick} // Corrected the typo here
          ></i>
          <i class="fa-solid fa-eye"style={{ cursor: "pointer" }}
            onClick={handlePreviewClick} ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
