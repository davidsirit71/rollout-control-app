import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "bulma/css/bulma.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
  };

  render() {
    // debugger
    if (this.state.loggedInUser) {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Rollout App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/projects">
                  Proyects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sites">
                  Sites
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="/consultas">
                  Consultas
                </Link>
              </li>
              <li className="nav-item active">
                <a className="nav-link" onClick={this.handleLogout}>
                  Logout <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
          <h3>Welcome, {this.state.loggedInUser.username}</h3>

          {console.log(this.state.loggedInUser.username)}
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Rollout App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login1
                </Link>
              </li>
            </ul>
          </div>
          <h3>Please, login or create an account</h3>
        </nav>
      );
    }
  }
}

export default Navbar;
