import React, { useContext, useState, useEffect, useRef }  from "react";
import noteContext from "../context/Notes/NoteContext";
import ReactMarkdown from "react-markdown"; // Import for rendering Markdown
import Footer from "./Footer";

import { useNavigate } from 'react-router-dom'; // For navigation on auth check
const AddNotes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { addNote } = context;
  const options = ["default", "work", "personal", "important"];
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  useEffect(() => {
    if (!localStorage.getItem("authtoken")) {
      navigate("/login"); // Redirect to login if no auth token is found
    }
  }, [navigate]);
  const handleClick = (event) => {
    event.preventDefault();
    if (note.title && note.description) {
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "default" });
      props.showAlert("Note added successfully", "success");
    } else {
      props.showAlert("Please fill in all fields", "danger");
    }
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  const previewRef = useRef(null); // Create a reference to the preview div

  useEffect(() => {
    // Scroll to the bottom when the description changes
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  }, [note.description]);
  return (
    <>
      <div className="container my-4">
        <h2 className="text-center mb-4">Add Notes</h2>
        <div className="row">
          {/* Left Div: Markdown Input */}
          <div className="col-md-6">
            <label htmlFor="description" className="form-label">
              Write in Markdown
            </label>
            <textarea
              className="form-control"
              id="description preview"
              name="description"
              rows="13"
              value={note.description}
              onChange={onChange}
              placeholder="Type your note in Markdown format"
            ></textarea>
          </div>
          {/* Right Div: Markdown Render */}
          <div className="col-md-6">
            <label htmlFor="preview" className="form-label">
              Preview
            </label>
            <div
              id="preview"
              className="border rounded p-3"
              style={{
                minHeight: "326px",
                maxHeight: "326px", // Set a maximum height for the scroll area
                backgroundColor: "#f8f9fa",
                overflowY: "auto", // Enable vertical scrolling
                overflowX: "hidden", // Hide horizontal scrolling
              }} ref={previewRef}
            >
              <ReactMarkdown>{note.description}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Title and Tag Inputs */}
        <div className="mt-4">
          <div className="row justify-content-center">
            {/* Title Input */}
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                Note Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={note.title}
                onChange={onChange}
                placeholder="Enter note title"
              />
            </div>

            {/* Tag Input */}
            <div className="col-md-6">
              <label htmlFor="tag" className="form-label">
                Note Tag
              </label>
              <select
                className="form-select"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onChange}
              >
                {options.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)} {/* Capitalize the tag */}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="btn btn-primary my-2"
            onClick={handleClick}
          >
            Add Note
          </button>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AddNotes;
