import React, { useContext, useState, useRef, useEffect } from "react";
import noteContext from "../context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, updateNotes, fetchNotes } = context;
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  // console.log(localStorage.getItem("authtoken"));
  const [user, setUser] = useState(null); // Added state to store user details
  const [loading, setLoading] = useState(true); // Added loading state to manage async data fetching

  useEffect(() => {
    if (!localStorage.getItem("authtoken")) {
      navigate("/login"); // Redirect to login if no auth token is found
    }
    fetchNotes(); // Fetch notes on component mount
    getUserDetails(); // Fetch user details
  }, [navigate, fetchNotes]);

  // Fetch user details from the API and update state
  const getUserDetails = () => {
    fetch(`http://localhost:8080/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setUser(data); // Set user details in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false); // Stop loading in case of error
      });
  };

  const updateNote = (currentNote) => {
    ref.current.click(); // Open modal
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    updateNotes(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-4">
        {/* Display user's name, email, and note count only if user data is loaded */}
        {loading ? (
          <div>Loading...</div> // Show loading text while data is being fetched
        ) : (
          user && (
            <div className="d-flex flex-column align-items-center mb-4">
              <h2 className="text-center heading">Welcome, {user.name}</h2>
              <div className="text-center">
                <p>
                  <b>Email: </b>
                  {user.email}
                </p>
                <p>
                  <b>Notes Created: </b> {notes.length}
                </p>
              </div>
            </div>
          )
        )}

        {/* Notes Display */}
        <h2 className="mb-4">Your Notes</h2>
        {notes.length > 0 ? (
          <div className="row">
            {notes.map((note) => (
              <div className="col-md-4" key={note._id}>
                <NoteItem
                  note={note}
                  updateNote={updateNote}
                  showAlert={props.showAlert}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            No notes added yet. Start by adding a new note above!
          </div>
        )}
      </div>

      {/* Modal for updating note */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#updateNoteModal"
      >
        Update Note
      </button>

      <div
        className="modal fade"
        id="updateNoteModal"
        tabIndex="-1"
        aria-labelledby="updateNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateNoteModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    placeholder="Enter note title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    value={note.edescription}
                    onChange={onChange}
                    placeholder="Enter note description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    placeholder="Enter note tag"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
