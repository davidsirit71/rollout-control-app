import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthServices from "./AuthService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.service = new AuthServices();
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });
        this.props.getUser(response);
      })
      .catch(err => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      });
  };

  handleChange = event => {
    console.log("evento", event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h3>Please, insert your credential to login.....</h3>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label for="username">User Name:</label>
            <input
              id="username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <fieldset>
            <label for="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <input type="submit" value="Log in" />
        </form>
        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}

export default Login;
