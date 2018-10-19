import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from '../projects/ProjectService'
import AuthService from "../auth/AuthService";
import SiteService from './SiteService';


class NewSite extends Component{
  constructor(props) {
    super(props);
    this.state = {
      sitename: '', 
      project: '', 
      phEnAc: false, 
      phInAc: false      
    };
    this.SiteService = new SiteService();
    this.pService = new ProjectService();
    this.uService = new AuthService();
  }

  //TODO debe ser un project id
  componentWillReceiveProps() {
    this.setState({
      lider: "5bc9af0f08667d3df0e1a794"
    });
  }

  handleChange = event => {
    console.log("eventos catched...", event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const sitename = this.state.sitename;
    const project = this.state.project;
    const phEnAc = false;
    const phInAc = false;

    this.pService
      .createNewProject(sitename, project, phEnAc, phInAc)
      .then(res => {
        this.setState({
          sitename: '', 
      project: '', 
      phEnAc: false, 
      phInAc: false   
        });
      })
      .catch(err => console.log(err));
  };


  render(){
    return(
      <div>
        <h2> Creation</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-group mb-3">
            <label for="sitename">
              <h3>Site Name:</h3>
            </label>
            <div className="input-group mb-3">
              <input
                id="sitename"
                type="sitename"
                name="sitename"
                value={this.state.sitename}
                onChange={e => this.handleChange(e)}
                className="form-control"
                aria-describedby="basic-addon3"
              />
            </div>
          </div>
          <div className="input-group mb-3">
            <label for="project">
              <h3>Project </h3>
            </label>
            <div className="input-group mb-3">
              <input
                id="project"
                type="project"
                name="project"
                value= '5bc9af0f08667d3df0e1a794'
                // value={this.state.project}
                onChange={e => this.handleChange(e)}
                className="form-control"
                aria-describedby="basic-addon3"
              />
            </div>
          </div>

          <input type="submit" value="create" />
        </form>
      </div>

    )
  }
}
export default NewSite;