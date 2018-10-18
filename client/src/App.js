import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import Projects from "./components/projects/Projects";
import Sites from "./components/sites/Sites";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      isAuthenticating: true
    };
    this.service = new AuthService();
  }

  _test = () => {
    this.service.loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response,
          isAuthenticating: false
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false,
          isAuthenticating: false
        });
      });
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj,
      isAuthenticating: false
    });
  };

  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  componentDidMount() {
    this._test();
  }

  render() {
    if (this.state.isAuthenticating)  return null;

    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>APP Rollout con usuario</h1>
            <Navbar
              userInSession={this.state.loggedInUser}
              logout={this.logout}
            />
            <Switch>
              <Route
                exact
                path="/projects"
                render={() => <Projects userData={this.state.loggedInUser} />}
              />
              <Route
                exact
                path="/sites"
                render={() => <Sites userData={this.state.loggedInUser} />}
              />
            </Switch>
          </header>
          {/* <Contents></Contents> */}
        </div>
      );
    } else {
      console.log('prueba 1')
      return (
        <div className="App">
          <header className="App-header">
            <Navbar
              userInSession={this.state.loggedInUser}
              logout={this.logout}
            />
            <Switch>
              <Route
                exact
                path="/signup"
                render={() => <Signup getUser={this.getTheUser} />}
              />
              <Route
                exact
                path="/login"
                render={() => <Login getUser={this.getTheUser} />}
              />
            </Switch>
          </header>
        </div>
      );
    }

  }
}

export default App;
