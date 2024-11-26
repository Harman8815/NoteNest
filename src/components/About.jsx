import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../assets/notes.png";
const About = () => {
  return (
    <div className="">
      <div
        className="about-container "
        style={{ height: "100vh", margin: "0 10vh" }}
      >
        <div className="row h-100">
          {/* Left div (Text Section) */}

          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={aboutImage}
              alt="About Illustration"
              className="img-fluid"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Right div (Image Section) */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <p className="about-text">
              NoteNest is a platform that allows you to take and manage your
              notes efficiently. Our goal is to provide a user-friendly
              experience for organizing your thoughts and ideas. Whether it's
              for personal use, study, or work, NoteNest ensures that all your
              notes are easily accessible and secure.
            </p>
            <p className="about-text">
              With features like adding notes, categorizing them, and even
              searching by tags, NoteNest aims to make your note-taking
              experience more productive and enjoyable. Additionally, we provide
              options to export your notes as PDF or DOCX files for offline
              access, making sure you never lose your important information.
            </p>
            <p className="about-text">
              With features like adding notes, categorizing them, and even
              searching by tags, NoteNest aims to make your note-taking
              experience more productive and enjoyable. Additionally, we provide
              options to export your notes as PDF or DOCX files for offline
              access, making sure you never lose your important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
