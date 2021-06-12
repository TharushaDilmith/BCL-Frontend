import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class navBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">
              Navbar
            </Link>
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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/view-books">
                    Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/view-authors">
                    Authors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-book">
                    Add book
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-author">
                    Add author
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/price-calculate">
                    Select books
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
