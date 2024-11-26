import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.jpg";
function HomePage() {
  return (
    <div className="home-container ">
      <div  className="d-flex justify-content-center align-items-center" style={{     flexDirection:'column',height: '100vh',margin:'0 40vh ', textAlign: 'center' }}>
        <h1>Welcome to NoteNest</h1>
        <h3>Your personal note-taking assistant</h3>
        <p>
          Take, organize, and manage your notes efficiently with NoteNest.
          Whether it's for study, work, or personal use, our platform offers an
          easy and convenient way to keep your ideas organized and accessible at
          all times.
        </p>
        <Link to="/addnotes">
          <button className="btn btn-primary mt-3">Add Notes</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
