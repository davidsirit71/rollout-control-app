import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "./ProjectService";
import AuthService from "../auth/AuthService";
//import "bulma/css/bulma.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.userData,
      dataProjects: []
    };
    this.pService = new ProjectService();
    this.uService = new AuthService();
  }

  // actualizar components
  // componentWillReceiveProps(nextProps){

  // }

  // deberia pasar el usuario o el id del usuario

  componentDidMount() {
    this.pService.getAllProjects().then(res => {
      this.setState({
        loggedInUser: this.props.userData,
        dataProjects: res
      });
    });
  }

  render() {
    //console.log("Proyectos: ...", this.state.dataProjects);
    //console.log("Usuario: ..", this.state.loggedInUser);
    const userAc = this.state.loggedInUser.username;
    const listP = this.state.dataProjects;
    console.log("proyectos: ..", listP[0]);
    console.log("Usuario: ..", userAc);

    // const proFilter = this.state.dataProjects.filter(e => {
    //   e.lider === this.state.loggedInUser._id
    // } )

    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="list-group">
            <button
              type="button"
              className="list-group-item list-group-item-action active"
            >
              <h3>{userAc} Projects list</h3>
            </button>
            <ul className="list-group">
              {this.state.dataProjects.map((e, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {e.projectname}
                  <span className="badge badge-info badge-pill">Vi</span>
                  <span className="badge badge-warning badge-pill">ed</span>
                  <span className="badge badge-danger badge-pill">de</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
