import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "./ProjectService";
import AuthService from "../auth/AuthService";
//import "bulma/css/bulma.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: "",
      dataProjects: [],
    };
    this.pService = new ProjectService();
    this.uService = new AuthService();
  }

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
    console.log(listP)


    console.log("Usuario: ..", userAc)
// if (this.state.dataProjects){
//   return(
//     this.state.dataProjects.map((e, i) =>  <p>{e._id}</p>)
//   )
// }
    return (
      <div calssName="list-group">
        <button
          type="button"
          calssName="list-group-item list-group-item-action active">
          <h3>{userAc} Projects list</h3>
        </button>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
          Proyecto XXX
            <span className="badge badge-info badge-pill">Vi</span>
            <span className="badge badge-warning badge-pill">ed</span>
            <span className="badge badge-danger badge-pill">de</span>
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-center">
          Proyecto XXX
            <span className="badge badge-info badge-pill">Vi</span>
            <span className="badge badge-warning badge-pill">ed</span>
            <span className="badge badge-danger badge-pill">de</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
          Proyecto XXX
            <span className="badge badge-info badge-pill">Vi</span>
            <span className="badge badge-warning badge-pill">ed</span>
            <span className="badge badge-danger badge-pill">de</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Projects;
