import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  // [ Logo ]   [ Home | Add Notes | Profile ]   [ 🔍 Search | login sign in or log out ]


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NoteNest</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto d-flex align-items-center ">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/addnotes" ? "active" : ""}`} to="/addnotes">Add Notes</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <div className=" navbar-right">
            <input className="form-control s" type="search" placeholder="Search" aria-label="Search" />
            <form className="d-flex">
              {!localStorage.getItem('authtoken') ? (
                <>
                  <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                  <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                </>
              ) : (
                <button
                  className="btn btn-primary mx-1"
                  onClick={() => {
                    localStorage.removeItem('authtoken');
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              )}
            </form></div>
        </div>
      </div>
    </nav>


  );
};

export default Navbar;
