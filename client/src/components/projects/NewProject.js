import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectService from "./ProjectService";
import AuthService from "../auth/AuthService";

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      customer: "",
      lider: this.props.userData._id
    };
    this.pService = new ProjectService();
    this.uService = new AuthService();
  }

  componentWillReceiveProps() {
    this.setState({
      lider: this.props.userData._id
    });
  }

  handleChange = event => {
    console.log("eventos catched...", event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const projectname = this.state.projectname;
    const customer = this.state.customer;
    const lider = this.state.lider;

    this.pService
      .createNewProject(projectname, customer, lider)
      .then(res => {
        this.setState({
          projectname: "",
          customer: "",
          lider: ""
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log("creacoion proyecto");

    return (
      <div>
        <h2>Project Creation</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-group mb-3">
            <label for="projectname">
              <h3>Project Name:</h3>
            </label>
            <div className="input-group mb-3">
              <input
                id="projectname"
                type="projectname"
                name="projectname"
                value={this.state.projectname}
                onChange={e => this.handleChange(e)}
                className="form-control"
                aria-describedby="basic-addon3"
              />
            </div>
          </div>
          <div className="input-group mb-3">
            <label for="customer">
              <h3>customer Name:</h3>
            </label>
            <div className="input-group mb-3">
              <input
                id="customer"
                type="customer"
                name="customer"
                value={this.state.customer}
                onChange={e => this.handleChange(e)}
                className="form-control"
                aria-describedby="basic-addon3"
              />
            </div>
          </div>

          <input type="submit" value="create" />
        </form>
      </div>
    );
  }
}
export default NewProject;
