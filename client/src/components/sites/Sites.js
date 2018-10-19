import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "../projects/ProjectService";
import SiteService from "./SiteService";

class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.userData,
      dataProjects: [],
      dataSites: []
    };
    this.pService = new ProjectService();
    this.sService = new SiteService();
  }

  componentDidMount() {
    const proyectos = this.pService.getAllProjects()
    const lugares = this.sService.getAllSites()

    Promise.all([proyectos, lugares]).then(data => {
      console.log(data);
      this.setState({
        //loggedInUser: data[0],
        dataProjects: data[0],
        dataSites: data[1]
      });
    });
  }

  render() {
   //console.log("Usuario logado: ", this.state.loggedInUser);
    //console.log("Proyectos: ", this.state.dataProjects);
    console.log("Sitios arrrrrr:", this.state.dataSites);

    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="list-group">
            <button
              type="button"
              className="list-group-item list-group-item-action active"
            >
              <h3>{this.state.loggedInUser.username} Sites List</h3>
            </button>
            <ul className="list-group">
              {this.state.dataSites.map((e, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {e.sitename}
                  <span className="badge badge-info badge-pill">Vi</span>
                  <span className="badge badge-warning badge-pill">ed</span>
                  <span className="badge badge-danger badge-pill">de</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Sites;
