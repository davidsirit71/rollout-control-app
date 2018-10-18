import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "./ProjectService";
import AuthService from "../auth/AuthService";
//import "bulma/css/bulma.css";

class Projects extends Comment {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: "",
      dataProjects: {}
    };
    this.pService = new ProjectService();
    this.uService = new AuthService();
  }

  //deberia pasar el usuario o el id del usuario

  render() {
    return (
      <div calssName="list-group">
        <button
          type="button"
          calssName="list-group-item list-group-item-action active"
        >
          Proyectos
        </button>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Proyecto 1<span className="badge badge-info badge-pill">Vi</span>
            <span className="badge badge-warning badge-pill">ed</span>
            <span className="badge badge-danger badge-pill">de</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Proyecto 2<span className="badge badge-info badge-pill">Vi</span>
            <span className="badge badge-warning badge-pill">ed</span>
            <span className="badge badge-danger badge-pill">de</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Proyecto 3<span className="badge badge-info badge-pill">Vi</span>
            <span className="badge badge-warning badge-pill">ed</span>
            <span className="badge badge-danger badge-pill">de</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Projects;
